import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.background.modal};
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border.default};

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;

  div {
    margin-bottom: 20px;
    &:last-child { margin-bottom: 0; }
  }

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
  padding: 11px 10px 10px 0px;
  border: 2px solid ${({ theme }) => theme.border.default};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.text.primary};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.button.primary.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 11px 10px 10px 0px;
  border: 2px solid ${({ theme }) => theme.border.default};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.text.primary};
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.button.primary.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid ${({ theme }) => theme.border.default};
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background: ${theme.button.primary.background};
    color: ${theme.button.primary.color};

    &:hover {
      background: ${theme.button.primary.hover};
    }
  `
      : `
    background: ${theme.button.secondary.background};
    color: ${theme.button.secondary.color};

    &:hover {
      background: ${theme.button.secondary.hover};
    }
  `}
`;
