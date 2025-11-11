import { Container, FormBox, Title } from "./styles";

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function FormContainer({ title, children }: FormContainerProps) {
  return (
    <Container>
      <FormBox>
        <Title>{title}</Title>
        {children}
      </FormBox>
    </Container>
  );
}
