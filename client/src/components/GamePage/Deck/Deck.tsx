import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";
import PlayerCards from "./PlayerCards";
import PlayerTokens from "./PlayerTokens";
import { JSX } from "react";
import { getActivePlayerId } from "@shared/utils";

interface PlayerProps {
  hoveredPlayerId: string;
  isClickedPlayer: boolean;
  activePlayerItemsComponent: JSX.Element;
}

export default function Deck({
  hoveredPlayerId,
  isClickedPlayer,
  activePlayerItemsComponent,
}: PlayerProps) {
  const [{ socket, players }] = useStateProvider();

  return (
    <Container>
        <DeckTokens>
            <PlayerTokens 
                hoveredPlayerId={hoveredPlayerId}
            />
        </DeckTokens>
        <DeckCards>
            {socket.id === getActivePlayerId(players) ? (
                activePlayerItemsComponent
            ) : (
                <PlayerCards
                    hoveredPlayerId={hoveredPlayerId}
                    isClickedPlayer={isClickedPlayer}
                />
            )}
        </DeckCards>
    </Container>
  );
}

const DeckGeneric = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 30px hsla(0, 0%, 0%, 10%);
  background: hsla(0, 0%, 100%, 5%);
  user-select: none;
  position: relative;
  margin: 0vw 1vw 0 1vw;
`

const DeckTokens = styled(DeckGeneric)`
  height: 5vh;
  border-radius: 16px 16px 16px 16px;
`

const DeckCards = styled(DeckGeneric)`
  height: 20vh;
  width: 98vw;
  border-radius: 16px 16px 0px 0px;
`;

const Container = styled.div`
  height: 26vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 1vh;
`
