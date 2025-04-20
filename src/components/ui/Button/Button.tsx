import StyledButton from "./StyledButton";

interface ButtonProps {
  label: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {label}
    </StyledButton>
  );
};

export default Button;
