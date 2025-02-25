'use client';

import SimpleChatMessageCard from './components/simpleChatMessage';
import useSimpleChat from './simpleChat.hooks';

const SimpleChat = () => {
  const { input, messages, handleChangeInput, handleSubmit } = useSimpleChat();

  return (
    <div className="flex flex-col h-screen bg-gray-100 py-20">
      <main className="flex-grow overflow-hidden">
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          <div className="flex-grow overflow-y-auto p-4 m-4 space-y-4 flex flex-col">
            {messages.map((message, idx) => (
              <SimpleChatMessageCard
                key={idx}
                role={message.role}
                messsage={message.content}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center p-4">
            <textarea
              placeholder="Type your message here..."
              value={input}
              onChange={handleChangeInput}
              className="flex-grow mr-2 p-4 border rounded-2xl border-gray-300"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-4 bg-blue-500 rounded-2xl text-white"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SimpleChat;
