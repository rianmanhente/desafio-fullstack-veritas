import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background.secondary};
`;

export const FormBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  margin-bottom: 24px;
`;
