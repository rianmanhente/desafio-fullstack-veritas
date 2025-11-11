import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
  margin-bottom: 4px;
`;

export const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.darkGray};
  }
`;
