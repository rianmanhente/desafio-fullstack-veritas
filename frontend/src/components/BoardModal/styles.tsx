import styled from "styled-components";
import { theme } from "../../utils/theme";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* overlay genérico */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 2px solid ${({ theme }) => theme.border.default};
  background: ${({ theme }) => theme.colors.darker};
  border-radius: 10px 10px 0 0;

  h2 {
    margin: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.light};
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray}33; /* 20% opacity */
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.background.primary};

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.secondary};
    font-size: 14px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 0px 10px 0px;
  border: 2px solid ${({ theme }) => theme.border.default};
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.primary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.darkGray};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 2px solid ${({ theme }) => theme.border.default};
  background: ${({ theme }) => theme.background.primary};
  border-radius: 0 0 10px 10px;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ theme, variant }) =>
    variant === "primary"
      ? `
    background: ${theme.button.primary.background};
    color: ${theme.button.primary.color};
    &:hover { background: ${theme.button.primary.hover}; }
  `
      : `
    background: ${theme.button.secondary.background};
    color: ${theme.button.secondary.color};
    &:hover { background: ${theme.button.secondary.hover}; }
  `}
`;
