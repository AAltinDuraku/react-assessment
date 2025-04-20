import { MessageContainer, MessageText } from "./StyledMessage";

interface MessageProps {
  type: "success" | "error";
  text: string;
}

const Message = ({ type, text }: MessageProps) => {
  return (
    <MessageContainer type={type}>
      <MessageText>
        {type === "success" && <span className="icon">✔️</span>}
        {type === "error" && <span className="icon">❌</span>}
        <span className="text">{text}</span>
      </MessageText>
    </MessageContainer>
  );
};

export default Message;
