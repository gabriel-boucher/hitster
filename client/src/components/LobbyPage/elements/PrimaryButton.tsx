import {ButtonHTMLAttributes, ReactNode} from "react";
import styled from "styled-components";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
    return (
        <PrimaryButtonContainer {...props}>
            <ButtonGlow />
            <ButtonText>{children}</ButtonText>
        </PrimaryButtonContainer>
    )
}

const PrimaryButtonContainer = styled.button`
    position: relative;
    background: var(--lobby-accent-subtle);
    border: 1px solid var(--lobby-accent-soft);
    border-radius: 16px;
    padding: 1rem 3.5rem;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s;
    backdrop-filter: blur(8px);

    &:hover {
        transform: scale(1.03);
        background: var(--lobby-accent-softer);
        border-color: var(--primary-color);
        box-shadow: 0 0 25px var(--lobby-accent-softer), inset 0 0 15px var(--lobby-accent-subtle);
    }

    &:active {
        transform: scale(0.97);
    }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 0, 224, 0.15),
    transparent
  );
  animation: shine 3s infinite;

  @keyframes shine {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

const ButtonText = styled.span`
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`;