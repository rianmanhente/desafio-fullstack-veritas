import styled from "styled-components";

export const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e5e5e5;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #d0d0d0;
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
  color: #333;
  margin: 0;
  flex: 1;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
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
    background: ${({ variant }) => 
      variant === "delete" ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
  }

  &:active {
    transform: scale(0.95);
  }
`;