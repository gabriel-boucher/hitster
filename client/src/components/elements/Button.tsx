import { JSX } from "react";
import styled from "styled-components";

interface ButtonProps {
    iconComponent: JSX.Element;
    handleClick: () => void;
}

export default function Button({ iconComponent, handleClick }: ButtonProps) {
  return (
    <ButtonWrapper>
        <ButtonContainer onClick={handleClick}>
            <Glow>
                {iconComponent}
            </Glow>
        </ButtonContainer>
    </ButtonWrapper>
  );
}

const Glow = styled.div`
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 0.4vh solid var(--primary-text-color);
    box-shadow: 0 0 0.2rem var(--primary-color), 0 0 0.5rem var(--primary-color), 0 0 1rem var(--primary-color),
    inset 0 0 0.2rem var(--primary-color), inset 0 0 0.5rem var(--primary-color), inset 0 0 1rem var(--primary-color);
`;

const ButtonContainer = styled.button`
    aspect-ratio: 1/1;
    height: 10vh;
    border-radius: 50%;
    border: none;
    padding: 1vh;
    background: hsla(0, 0%, 100%, 20%);

    &:hover {
        cursor: pointer;
        height: 100%;

        ${Glow} {
            box-shadow: 0 0 0.4rem var(--primary-color), 0 0 0.7rem var(--primary-color), 0 0 1.2rem var(--primary-color),
            inset 0 0 0.4rem var(--primary-color), inset 0 0 0.7rem var(--primary-color), inset 0 0 1.2rem var(--primary-color);
        }
    }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10.2vh;
  aspect-ratio: 1/1;
`;