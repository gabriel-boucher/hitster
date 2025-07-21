import { socketEvents } from "@shared/Constants";
import { PlayerInterface } from "@shared/Interfaces";
import { useEffect, useRef, useState } from "react";
import Plus from "src/components/icons/Plus";
import {
  PINK_COLOR__HEX,
  PLAYERS_IMG,
  WHITE_COLOR__HEX,
} from "src/utils/Constants";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

export default function PlayerInLobby() {
  const [{ socket, gameState, items, players }] = useStateProvider();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const changePlayerImage = (image: string) => {
    const newPlayers = players.map((player: PlayerInterface) =>
      player.socketId === socket.id ? { ...player, image } : player
    );
    players.find(
      (player: PlayerInterface) => player.socketId === socket.id
    )!.image = image;
    socket.emit(socketEvents.UPDATE_GAME_STATE, {
      gameState,
      players: newPlayers,
      items,
    });
  };

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
          )?.image || "red"
        }
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <PlusIcon>{Plus()}</PlusIcon>
      </PlayerImgSelected>

      {isMenuOpen && (
        <PlayerImgMenu>
          {PLAYERS_IMG.map((image: string, index: number) => (
            <PlayerImgInMenu
              key={index}
              $playerImage={image}
              onClick={() => {
                changePlayerImage(image)
                setIsMenuOpen(false);
              }}
            />
          ))}
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

  &:hover ${PlusIcon} {
    display: flex;
  }
`;

const PlayerImgInMenu = styled(PlayerImg)`
  width: 5vh;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px ${PINK_COLOR__HEX};
  }
`;

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
