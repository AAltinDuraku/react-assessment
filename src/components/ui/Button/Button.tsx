interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
