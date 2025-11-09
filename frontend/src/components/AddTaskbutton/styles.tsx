import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;

  background: ${({ theme }) => theme.colors.light};
  border: 2px dashed ${({ theme }) => theme.colors.darkGray};
  border-radius: 8px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.darker};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 12px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.darker};
    color: ${({ theme }) => theme.colors.black};
    transform: translateY(-1px);
  }

  span:first-child {
    font-size: 20px;
    font-weight: 600;
  }

  &:active {
    transform: scale(0.98);
  }
`;
