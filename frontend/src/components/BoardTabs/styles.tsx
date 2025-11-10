import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: ${({ theme }) => theme.background.primary};
  border-bottom: 2px solid ${({ theme }) => theme.border.default};
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.darkGray};
    border-radius: 3px;
  }
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  padding: 10px 16px;
  background: ${({ $isActive }) =>
    $isActive ? '#000000' : 'transparent'}; 
  border: none;
  border-bottom: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.light : 'transparent'};
  color: ${({ $isActive }) => 
    $isActive ? '#ffffff' : 'inherit'}; 
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  border-radius: 8px;

  &:hover {
    background: ${({ $isActive, theme }) => 
      $isActive ? '#00000' : theme.background.secondary}; 
  }
`;

export const TabContent = styled.span`
  display: block;
  flex: 1; 
`;

export const TabActions = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0.5; 
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  ${Tab}:hover & {
    opacity: 1; 
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px; 
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.background.secondary};
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 0.2);
  }
`;



export const AddBoardButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.button.primary.background};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.button.primary.color};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.button.primary.hover};
  }
`;
