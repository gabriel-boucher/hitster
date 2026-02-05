import styled from "styled-components";
import {useMemo} from "react";
import {Token} from "../../../type/item/Token.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import useMouseDragOverDeck from "../../../hooks/socket/movement/useMouseDragOverDeck.ts";
import useMouseOverDeck from "../../../hooks/socket/movement/useMouseOverDeck.ts";
import useMouseClickToken from "../../../hooks/socket/movement/useMouseClickToken.ts";
import * as React from "react";

export default function ActiveToken({ token } : { token: Token }) {
  const [{ players }] = useRoomStateProvider();
  const [{ isDragging }] = useMovementStateProvider();

  const mouseDragOverDeck = useMouseDragOverDeck()
  const mouseOverDeck = useMouseOverDeck()
  const mouseClickToken = useMouseClickToken()

  const handleMouseEvents = useMemo(
    () => ({
      onClick: () => mouseClickToken(token),
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, token)
          : mouseOverDeck(e, token),
      onTouchStart : (e: React.TouchEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, token)
          : mouseOverDeck(e, token),
      onTouchMove : (e: React.TouchEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, token)
          : mouseOverDeck(e, token),
    }),
    [token, isDragging, mouseDragOverDeck, mouseOverDeck, mouseClickToken]
  );

  const style = {
    opacity: token.status === ItemStatus.ACTIVE_IN_CURRENT_DECK ? 1 : 0.3,
    border: token.status === ItemStatus.ACTIVE_IN_CURRENT_DECK ? "none" : "2px solid var(--primary-text-color)",
  };

  return (
    <ActiveTokenComponent {...handleMouseEvents}>
      <div className="token-container" style={style}>
        <div className="details">
          <div className="player-name">
            {players.find((player) => player.id === token.ownerId)?.name}
          </div>
        </div>
      </div>
    </ActiveTokenComponent>
  );
}

const ActiveTokenComponent = styled.div`
  aspect-ratio: 1; // gotta keep the size to prevent flickering
  height: 100%;
  width: auto;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  user-select: none;

  &:first-child::before,
  &:last-child::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100vw;
    user-select: none;
  }

  &::before {
    right: 99%;
  }

  &::after {
    left: 99%;
  }

  .token-container {
    aspect-ratio: 1/1;
    width: 60%;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    border-radius: 50%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;

    cursor: pointer;
  }

  .details {
    width: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    flex-shrink: 1;
    min-width: 0;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5%;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;

    background-color: hsla(0, 0%, 100%, 90%);
    padding: 0px 4px 4px 4px;

    user-select: none;

    .player-name {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }
  }
`;
