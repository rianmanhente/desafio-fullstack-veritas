import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 12px;

  &:hover {
    border-color: #999;
    color: #333;
    background: rgba(0, 0, 0, 0.02);
  }

  span:first-child {
    font-size: 20px;
    font-weight: 600;
  }
`;