import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background.primary};
`;

export const Column = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.background.modal};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(13, 13, 13, 0.1);
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border.default};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 13, 13, 0.15);
  }
`;

export const ColumnTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  padding-bottom: 8px;
`;
