import styled from "styled-components";
import * as React from "react";
import {useMemo} from "react";
import {Token} from "../../../type/item/Token.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import useMouseDragOverDeck from "../../../hooks/movement/useMouseDragOverDeck.ts";
import useMouseOverDeck from "../../../hooks/movement/useMouseOverDeck.ts";
import useMouseClickToken from "../../../hooks/movement/useMouseClickToken.ts";
import {Position} from "../../../hooks/movement/getNewIndex.ts";

export default function ActiveToken({ token } : { token: Token }) {
  const [{ players }] = useRoomStateProvider();
  const [{ isDragging }] = useMovementStateProvider();

  const mouseDragOverDeck = useMouseDragOverDeck()
  const mouseOverDeck = useMouseOverDeck()
  const mouseClickToken = useMouseClickToken()

  const mouseClickEvents = useMemo(
    () => ({
      onClick: () => mouseClickToken(token),
    }),
    [token, mouseClickToken]
  );

  const mouseOverEvents = useMemo(
    () => (mousePosition: Position) => ({
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, token, mousePosition)
          : mouseOverDeck(e, token, mousePosition),
      onTouchMove: (e: React.TouchEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, token, mousePosition)
          : mouseOverDeck(e, token, mousePosition),
    }),
    [token, isDragging, mouseDragOverDeck, mouseOverDeck]
  );

  const style = {
    opacity: token.status === ItemStatus.ACTIVE_IN_CURRENT_DECK ? 1 : 0.3,
    border: token.status === ItemStatus.ACTIVE_IN_CURRENT_DECK ? "none" : "2px solid var(--primary-text-color)",
  };

  return (
    <ActiveTokenComponent {...mouseClickEvents}>
      <div className="token-container" style={style}>
        <div className="details">
          <div className="player-name">
            {players.find((player) => player.id === token.ownerId)?.name}
          </div>
        </div>
      </div>
      {isDragging && (<div className="token-hover left" {...mouseOverEvents(Position.LEFT)}/>)}
      {isDragging && (<div className="token-hover right" {...mouseOverEvents(Position.RIGHT)}/>)}
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

    .token-hover {
        position: absolute;
        height: 100%;
        width: 50%;
        z-index: 1;
    }

    .token-hover.left {
        left: 0;
    }

    .token-hover.right {
        right: 0;
    }

    &:last-child {
        .token-hover.right {
            right: calc(-50vw + 50%);
            width: 50vw;
        }
    }

    &:first-child {
        .token-hover.left {
            left: calc(-50vw + 50%);
            width: 50vw;
        }
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
    padding: 0 4px 4px 4px;

    user-select: none;

    .player-name {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }
  }
`;
