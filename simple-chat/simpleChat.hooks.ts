import { ChangeEvent, FormEvent, useState } from 'react';
import { SimpleMessageType } from './simpleChat.types';
import ollama from 'ollama/browser';

const useSimpleChat = () => {
  const [messages, setMessages] = useState<SimpleMessageType[]>([
    {
      role: 'assistant',
      content: 'Hello! How can I assist to you today',
    },
  ]);

  const [input, setInput] = useState<string>('');

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: SimpleMessageType = { role: 'user', content: input };
      setMessages((prevMessage) => [...prevMessage, newMessage]);

      // function AI
      const { message } = await ollama.chat({
        model: 'deepseek-r1:1.5b',
        messages: [newMessage],
        stream: false,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: message.content,
        },
      ]);

      setInput('');
    }
  };

  return {
    handleSubmit,
    input,
    handleChangeInput,
    messages,
  };
};

export default useSimpleChat;
