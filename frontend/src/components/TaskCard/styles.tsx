import styled from "styled-components";

export const CardContainer = styled.div`
  background: ${({ theme }) => theme.background.modal};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(13, 13, 13, 0.1);
  margin-bottom: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid ${({ theme }) => theme.border.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 13, 13, 0.15);
    border-color: ${({ theme }) => theme.colors.gray};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  flex: 1;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`;

export const IconButton = styled.button<{ variant?: "delete" }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background: ${({ variant, theme }) =>
      variant === "delete"
        ? "rgba(220, 38, 38, 0.1)" // vermelho para deletar
        : theme.background.secondary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CardFooter = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.border.default};
`;

export const DateText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text.muted};
  display: flex;
  align-items: center;
  gap: 4px;
`;
