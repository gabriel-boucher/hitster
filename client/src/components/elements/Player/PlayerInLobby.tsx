import { PLAYER_COLORS } from "@shared/constants";
import { useEffect, useRef, useState } from "react";
import Plus from "src/components/icons/Plus";
import XMark from "src/components/icons/XMark";
import {
  PINK_COLOR__HEX,
  WHITE_COLOR__HEX,
} from "src/utils/constants";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";
import {Player} from "../../../type/player/Player.ts";
import useChangePlayerColor from "../../../hooks/socket/room/useChangePlayerColor.ts";

export default function PlayerInLobby() {
  const [{ socket, roomId, players }] = useStateProvider();
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
      <PlayerColorSelected
        $playerColor={
          players.find(
            (player: Player) => player.id === socket.id
          )?.color || ""
        }
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <PlusIcon><Plus /></PlusIcon>
      </PlayerColorSelected>

      {isMenuOpen && (
        <PlayerColorMenu>
        {PLAYER_COLORS.map((color: string, index: number) => {
          const isTaken = players.some((player: Player) => player.color === color);
          
          if (isTaken) {
            return (
              <PlayerImgInMenuTaken
                key={index}
                $playerColor={color}
              >
                <XMarkContainer>
                  <XMark/>
                </XMarkContainer>
              </PlayerImgInMenuTaken>
            );
          } else {
            return (
              <PlayerColorInMenu
                key={index}
                $playerColor={color}
                onClick={() => {
                  useChangePlayerColor(socket, roomId, color);
                  setIsMenuOpen(false);
                }}
              />
            );
          }
        })}
      </PlayerColorMenu>
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

const PlayerImg = styled.div<{ $playerColor: string }>`
  aspect-ratio: 1/1;
  border-radius: 50%;
  /* background-image: url(${({ $playerColor }) => $playerColor}); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-color: ${({ $playerColor }) => $playerColor};
`;

const PlayerColorSelected = styled(PlayerImg)`
  width: 7vh;
  border: 2px solid black;
  box-shadow: 0 0 0 2px ${PINK_COLOR__HEX};

  &:hover ${PlusIcon} {
    display: flex;
  }
`;

const PlayerColorInMenu = styled(PlayerImg)`
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

const PlayerColorMenu = styled.div`
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
