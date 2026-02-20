import styled from "styled-components";

export const SectionListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem;
  background: var(--lobby-white-3);
  border-radius: 10px;
  border: 1px solid var(--lobby-accent-softer);
  transition: all 0.2s;
  height: 48px;
  font-size: 1rem;

  &:hover {
    background: var(--lobby-white-6);
  }
`;