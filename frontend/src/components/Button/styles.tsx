import styled from "styled-components";

export const StyledButton = styled.button<{ variant: "primary" | "secondary" }>`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.button.primary.background
      : theme.button.secondary.background};
  color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.button.primary.color
      : theme.button.secondary.color};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "primary"
        ? theme.button.primary.hover
        : theme.button.secondary.hover};
  }
`;
