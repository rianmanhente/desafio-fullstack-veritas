import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ active }) => (active ? "#fff" : "transparent")};
  border: ${({ active }) => (active ? "2px solid #3085d6" : "2px solid transparent")};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active }) => (active ? "#3085d6" : "#666")};
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;

  &:hover {
    background: ${({ active }) => (active ? "#fff" : "#e8e8e8")};
  }
`;

export const TabContent = styled.span`
  flex: 1;
`;

export const TabActions = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 8px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 0.1);
  }
`;

export const AddBoardButton = styled.button`
  padding: 10px 20px;
  background: #3085d6;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #2574c1;
  }
`;