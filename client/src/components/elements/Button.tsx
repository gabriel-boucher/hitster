import { PINK_COLOR__HEX, WHITE_COLOR__HEX } from "src/utils/Constants";
import styled from "styled-components";

interface ButtonProps {
    iconSrc: string;
    handleClick: () => void;
}

export default function Button({ iconSrc, handleClick }: ButtonProps) {
  return (
    <ButtonWrapper>
        <ButtonContainer onClick={handleClick}>
            <Glow>
                <Icon src={iconSrc} />
            </Glow>
        </ButtonContainer>
    </ButtonWrapper>
  );
}

const Icon = styled.img`
  aspect-ratio: 1/1;
  max-height:50%; 
  max-width:50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Glow = styled.div`
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.4vh solid ${WHITE_COLOR__HEX};
  box-shadow: 0 0 0.2rem ${PINK_COLOR__HEX}, 0 0 0.5rem ${PINK_COLOR__HEX}, 0 0 1rem ${PINK_COLOR__HEX},
    inset 0 0 0.2rem ${PINK_COLOR__HEX}, inset 0 0 0.5rem ${PINK_COLOR__HEX}, inset 0 0 1rem ${PINK_COLOR__HEX};
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
      box-shadow: 0 0 0.4rem ${PINK_COLOR__HEX}, 0 0 0.7rem ${PINK_COLOR__HEX}, 0 0 1.2rem ${PINK_COLOR__HEX},
        inset 0 0 0.4rem ${PINK_COLOR__HEX}, inset 0 0 0.7rem ${PINK_COLOR__HEX}, inset 0 0 1.2rem ${PINK_COLOR__HEX};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10.2vh;
`;