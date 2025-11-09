import styled from "styled-components";

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
  padding: 24px;
  overflow: auto;
`;