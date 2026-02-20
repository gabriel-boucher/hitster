import styled from "styled-components";
import useStartGame from "../hooks/http/room/useStartGame.ts";
import { useConnectionStateProvider } from "../stateProvider/connection/ConnectionStateProvider.tsx";
import { useRoomStateProvider } from "../stateProvider/room/RoomStateProvider.tsx";
import ProfileSection from "../components/LobbyPage/Profile/ProfileSection.tsx";
import PlaylistsSection from "../components/LobbyPage/Playlists/PlaylistsSection.tsx";
import PlayersSection from "../components/LobbyPage/Players/PlayersSection.tsx";
import SettingsSection from "../components/LobbyPage/Settings/SettingsSection.tsx";
import PrimaryButton from "../components/LobbyPage/elements/PrimaryButton.tsx";

interface Props {
  setPageLoading: (loading: boolean) => void;
}

export default function LobbyPage({ setPageLoading }: Props) {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ players }] = useRoomStateProvider();

  const startGame = useStartGame();

  const isHost = players.length > 0 && players[0].id === playerId;

  return (
    <Container>
      <Header>
        <div>
          <Logo>HITSTER</Logo>
          <Tagline>The Ultimate Music Guessing Game</Tagline>
        </div>
        <Footer>
          {isHost && (
            <PrimaryButton onClick={() => startGame(setPageLoading)}>
                Start Game
            </PrimaryButton>
          )}
      </Footer>
      </Header>

      <MainContent>
        <Panel>
          <ProfileSection />
          <PlaylistsSection />
          <SettingsSection />
        </Panel>

        <Panel>
          <PlayersSection />
        </Panel>
      </MainContent>

    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  //flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  box-sizing: border-box;
  color: var(--primary-text-color);
  font-family: "Poppins", sans-serif;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    text-align: center;
`;

const Logo = styled.h1`
    font-size: 4.5rem;
    margin: 0;
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
    letter-spacing: 0.5rem;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            text-shadow: 0 0 10px var(--primary-color);
        }
        50% {
            text-shadow: 0 0 20px var(--primary-color);
        }
        100% {
            text-shadow: 0 0 10px var(--primary-color);
        }
    }
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: var(--lobby-white-60);
  margin: 0.3rem 0 0 0;
  letter-spacing: 0.2rem;
`;

const MainContent = styled.main`
  display: flex;
  gap: 2rem;
  flex: 1;
  min-height: 0;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
`;



