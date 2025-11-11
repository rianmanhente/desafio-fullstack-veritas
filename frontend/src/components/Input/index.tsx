import { InputContainer, StyledInput, Label } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} />
    </InputContainer>
  );
}
