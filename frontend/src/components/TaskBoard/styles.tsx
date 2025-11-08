import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f6fa;
`;

export const Column = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const ColumnTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
  text-align: center;
`;
