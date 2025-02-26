import ReactMarkdown from 'react-markdown';
import { ThoughtMessage } from './ThoughtMessage';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  thought?: string;
}

const ChatMessage = (props: ChatMessageProps) => {
  const isAssistant = props.role === 'assistant';
  console.log(props.thought)
  return (
    <>
      {props.thought && <ThoughtMessage thought={props.thought} />}
      <div
        className={`w-fit whitespace-pre-line ${
          props.role === 'user' ? 'self-end' : ''
        }`}
      >
        <div
          className={`rounded-lg p-4 max-w-[80%] ${
            props.role === 'assistant'
              ? 'bg-secondary'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          <div className={`${isAssistant ? 'prose dark:prose invert' : ''}`}>
            <ReactMarkdown>{props.content.trim()}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
