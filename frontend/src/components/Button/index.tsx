import { StyledButton } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  label: string;
}

export default function Button({ label, variant = "primary", ...props }: ButtonProps) {
  return <StyledButton variant={variant} {...props}>{label}</StyledButton>;
}
