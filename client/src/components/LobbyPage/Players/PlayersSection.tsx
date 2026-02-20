import styled from "styled-components";
import useRemovePlayer from "../../../hooks/http/room/useRemovePlayer.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useRoomStateProvider } from "../../../stateProvider/room/RoomStateProvider.tsx";
import Section from "../components/Section.tsx";
import RemoveButton from "../elements/RemoveButton.tsx";
import {SectionListContainer} from "../components/SectionListContainer.tsx";
import {SectionListItem} from "../components/SectionListItem.tsx";

export default function PlayersSection() {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ players }] = useRoomStateProvider();

  const removePlayer = useRemovePlayer();

  const isHost = players.length > 0 && players[0].id === playerId;

  return (
    <Section title={"Players"}>
      <SectionListContainer>
        {players
          .filter((player) => player.name)
          .map((player) => (
            <SectionListItem key={player.id}>
              <PlayerIcon $color={player.color} />
              <PlayerName>{player.name}</PlayerName>
              {player.id === players[0]?.id && (
                <HostBadge>Host</HostBadge>
              )}
              {isHost && playerId !== player.id &&
                <RemoveButton onClick={() => removePlayer(player.id)} />
              }
            </SectionListItem>
          ))}
        <WaitingListItem>
          <WaitingIcon>?</WaitingIcon>
          <WaitingText>Waiting for players...</WaitingText>
        </WaitingListItem>
      </SectionListContainer>
    </Section>
  );
}

const PlayerIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 3px solid var(--lobby-white-20);
`;

const PlayerName = styled.span`
  flex: 1;
  font-weight: bold;
`;

const HostBadge = styled.span`
  font-size: 0.75rem;
  color: var(--lobby-gold);
  background: var(--lobby-gold-bg);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  border: 1px solid var(--lobby-gold-border);
`;

const WaitingListItem = styled(SectionListItem)`
  background: transparent;
  border: 2px dashed var(--lobby-white-20);
  color: var(--lobby-white-40);
  
  &&:hover {
    background: transparent;
  }
`;

const WaitingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--lobby-white-20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const WaitingText = styled.span`
`;
