import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";
import PlayerCards from "./PlayerCards";
import PlayerTokens from "./PlayerTokens";
import { JSX } from "react";

interface PlayerProps {
  hoveredPlayerId: string;
  isClickedPlayer: boolean;
  activePlayerItemsComponent: JSX.Element;
}

export default function Deck({ hoveredPlayerId, isClickedPlayer, activePlayerItemsComponent }: PlayerProps) {
  const [{ socket, activePlayer }] = useStateProvider();
    
  return <Container>
    {socket.id === activePlayer.socketId
          ? activePlayerItemsComponent
          : (
            <>
              <PlayerCards hoveredPlayerId={hoveredPlayerId} isClickedPlayer={isClickedPlayer}/>
              <Separator />
              <PlayerTokens />
            </>
          )}
  </Container>;
}

const Separator = styled.div`
  position: absolute;
  right: 6.8%;
  top: 5%;
  width: 0.1rem;
  height: 90%;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 20vh;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0 4px 30px hsla(0, 0%, 0%, 10%);
  background: hsla(0, 0%, 100%, 20%);
  user-select: none;
  position: relative;
`;
