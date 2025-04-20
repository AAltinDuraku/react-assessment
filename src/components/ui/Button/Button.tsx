import StyledButton from "./StyledButton";

interface ButtonProps {
  label: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  isDelete?: boolean;
}

const Button = ({ label, onClick, type = "button", isDelete = false }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type} isDelete={isDelete}>
      {label}
    </StyledButton>
  );
};

export default Button;
