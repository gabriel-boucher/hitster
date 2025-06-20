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
  border: 0.4vh solid white;
  box-shadow: 0 0 0.2rem #fe13a4, 0 0 0.5rem #fe13a4, 0 0 1rem #fe13a4,
    inset 0 0 0.2rem #fe13a4, inset 0 0 0.5rem #fe13a4, inset 0 0 1rem #fe13a4;

  &:hover {
    box-shadow: 0 0 0.4rem #fe13a4, 0 0 0.7rem #fe13a4, 0 0 1.2rem #fe13a4,
      inset 0 0 0.4rem #fe13a4, inset 0 0 0.7rem #fe13a4, inset 0 0 1.2rem #fe13a4;
  }
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
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10.2vh;
`;