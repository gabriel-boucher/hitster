import styled from "styled-components";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  flexShrink?: boolean;
}

export default function Section({ title, children, flexShrink = false }: SectionProps) {
  return (
    <SectionContainer $flexShrink={flexShrink}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
}

const SectionContainer = styled.div<{ $flexShrink: boolean }>`
  background: var(--lobby-white-3);
  border: 1px solid var(--lobby-accent-soft);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: ${({ $flexShrink }) => ($flexShrink ? "0 0 auto" : "1")};
  min-height: 0;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: var(--primary-color);
`;