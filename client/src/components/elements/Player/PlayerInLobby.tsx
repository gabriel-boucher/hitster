import { PLAYERS_IMG } from "@shared/Constants";
import { PlayerInterface } from "@shared/Interfaces";
import { useEffect, useRef, useState } from "react";
import Plus from "src/components/icons/Plus";
import XMark from "src/components/icons/XMark";
import {
  PINK_COLOR__HEX,
  WHITE_COLOR__HEX,
} from "src/utils/Constants";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface Props {
  changePlayerImage: (image: string) => void;
}

export default function PlayerInLobby({ changePlayerImage }: Props) {
  const [{ socket, players }] = useStateProvider();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Container ref={menuRef}>
      <PlayerImgSelected
        $playerImage={
          players.find(
            (player: PlayerInterface) => player.socketId === socket.id
          )?.image || ""
        }
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <PlusIcon><Plus /></PlusIcon>
      </PlayerImgSelected>

      {isMenuOpen && (
        <PlayerImgMenu>
        {PLAYERS_IMG.map((image: string, index: number) => {
          const isTaken = players.some((player: PlayerInterface) => player.image === image);
          
          if (isTaken) {
            return (
              <PlayerImgInMenuTaken
                key={index}
                $playerImage={image}
              >
                <XMarkContainer>
                  <XMark/>
                </XMarkContainer>
              </PlayerImgInMenuTaken>
            );
          } else {
            return (
              <PlayerImgInMenu
                key={index}
                $playerImage={image}
                onClick={() => {
                  changePlayerImage(image);
                  setIsMenuOpen(false);
                }}
              />
            );
          }
        })}
      </PlayerImgMenu>      
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const PlusIcon = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  width: 7vh;
  border-radius: 50%;
  background: hsla(0, 0%, 0%, 60%);
  cursor: pointer;
  z-index: 3;
`;

const PlayerImg = styled.div<{ $playerImage: string }>`
  aspect-ratio: 1/1;
  border-radius: 50%;
  /* background-image: url(${({ $playerImage }) => $playerImage}); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-color: ${({ $playerImage }) => $playerImage};
`;

const PlayerImgSelected = styled(PlayerImg)`
  width: 7vh;
  border: 2px solid black;
  box-shadow: 0 0 0 2px ${PINK_COLOR__HEX};

  &:hover ${PlusIcon} {
    display: flex;
  }
`;

const PlayerImgInMenu = styled(PlayerImg)`
  width: 5vh;
  border: 1px solid black;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px ${PINK_COLOR__HEX};
  }
`;

const PlayerImgInMenuTaken = styled(PlayerImg)`
  width: 5vh;
  border: 1px solid black;
  pointer-events: none;
`;

const XMarkContainer = styled.div`
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  background: hsla(0, 0%, 0%, 60%);
`

const PlayerImgMenu = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1vh;
  padding: 1.5vh;
  background: ${WHITE_COLOR__HEX};
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  z-index: 2;
  max-height: 12vh;
  overflow-y: auto;
  scrollbar-width: none;
`;
