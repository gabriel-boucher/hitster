import styled from "styled-components";

export const SectionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
      width: 0;
  }
`;