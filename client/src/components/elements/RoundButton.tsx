import {ButtonHTMLAttributes, JSX} from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconComponent: JSX.Element;
}

export default function RoundButton({ iconComponent, ...props }: ButtonProps) {
  return (
      <ButtonContainer {...props}>
          <Glow>
              {iconComponent}
          </Glow>
      </ButtonContainer>
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
        transform: scale(1.02);

        ${Glow} {
            box-shadow: 0 0 0.4rem var(--primary-color), 0 0 0.7rem var(--primary-color), 0 0 1.2rem var(--primary-color),
            inset 0 0 0.4rem var(--primary-color), inset 0 0 0.7rem var(--primary-color), inset 0 0 1.2rem var(--primary-color);
        }
    }
`;