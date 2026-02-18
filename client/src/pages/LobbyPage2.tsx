import styled from "styled-components";
import avatarImg from "../assets/avatar.webp";

const mockPlayers = [
  { id: "1", name: "Player 1", color: "#FF5733" },
  { id: "2", name: "Player 2", color: "#33FF57" },
  { id: "3", name: "Player 3", color: "#3357FF" },
];

const mockPlaylists = [
  { id: "1", name: "Top Hits 2024", imageUrl: "https://via.placeholder.com/50" },
  { id: "2", name: "90s Classics", imageUrl: "https://via.placeholder.com/50" },
];

const avatars = [
  { id: 1, color: "#FF5733" },
  { id: 2, color: "#33FF57" },
  { id: 3, color: "#3357FF" },
  { id: 4, color: "#FF33F5" },
  { id: 5, color: "#F5FF33" },
  { id: 6, color: "#33FFF5" },
];

export default function LobbyPage2() {
  return (
    <Container>
      <Header>
        <Logo>HITSTER</Logo>
        <Tagline>The Ultimate Music Guessing Game</Tagline>
      </Header>

      <MainContent>
        <LeftPanel>
          <Section>
            <SectionTitle>Your Profile</SectionTitle>
            <ProfileCard>
              <AvatarSection>
                <CurrentAvatar>
                  <AvatarImage src={avatarImg} alt="Avatar" />
                </CurrentAvatar>
                <AvatarPicker>
                  <AvatarLabel>Choose your color</AvatarLabel>
                  <AvatarGrid>
                    {avatars.map((avatar) => (
                      <AvatarOption
                        key={avatar.id}
                        $color={avatar.color}
                        $selected={avatar.id === 1}
                      />
                    ))}
                  </AvatarGrid>
                </AvatarPicker>
              </AvatarSection>
              <UsernameSection>
                <UsernameLabel>Username</UsernameLabel>
                <UsernameInput
                  placeholder="Enter your name..."
                  defaultValue=""
                />
              </UsernameSection>
            </ProfileCard>
          </Section>

          <Section>
            <SectionTitle>
              <span>Selected Playlists</span>
              <PlaylistCount>{mockPlaylists.length}</PlaylistCount>
            </SectionTitle>
            <PlaylistsContainer>
              {mockPlaylists.map((playlist) => (
                <PlaylistItem key={playlist.id}>
                  <PlaylistImage $imageUrl={playlist.imageUrl} />
                  <PlaylistInfo>
                    <PlaylistName>{playlist.name}</PlaylistName>
                  </PlaylistInfo>
                </PlaylistItem>
              ))}
              <ChoosePlaylistButton>
                <PlusIcon>+</PlusIcon>
                <span>Choose Playlist</span>
              </ChoosePlaylistButton>
            </PlaylistsContainer>
          </Section>
        </LeftPanel>

        <RightPanel>
          <Section>
            <SectionTitle>
              <span>Players in Lobby</span>
              <PlayerCount>{mockPlayers.length}</PlayerCount>
            </SectionTitle>
            <PlayersContainer>
              {mockPlayers.map((player) => (
                <PlayerCard key={player.id}>
                  <PlayerAvatar $color={player.color} />
                  <PlayerName>{player.name}</PlayerName>
                  <PlayerStatus>Ready</PlayerStatus>
                </PlayerCard>
              ))}
              <WaitingSlot>
                <WaitingIcon>?</WaitingIcon>
                <WaitingText>Waiting for players...</WaitingText>
              </WaitingSlot>
            </PlayersContainer>
          </Section>
        </RightPanel>
      </MainContent>

      <Footer>
        <StartGameButton>
          <ButtonGlow />
          <ButtonText>Start Game</ButtonText>
        </StartGameButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  color: var(--primary-text-color);
  font-family: "Poppins", sans-serif;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const Header = styled.header`
  text-align: center;
  flex-shrink: 0;
`;

const Logo = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  color: var(--primary-bg-color);
  text-shadow: 0 0 10px var(--primary-bg-color), 0 0 20px var(--primary-bg-color);
  letter-spacing: 0.5rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { text-shadow: 0 0 10px var(--primary-bg-color); }
    50% { text-shadow: 0 0 25px var(--primary-bg-color), 0 0 35px var(--primary-bg-color); }
    100% { text-shadow: 0 0 10px var(--primary-bg-color); }
  }
`;

const Tagline = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0.3rem 0 0 0;
  letter-spacing: 0.2rem;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  min-height: 0;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
`;

const LeftPanel = styled(Panel)`
  flex: 1;
`;

const RightPanel = styled(Panel)`
  flex: 1;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 0, 224, 0.3);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;

  &:first-child {
    flex: 0 0 auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  color: var(--primary-bg-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const PlayerCount = styled.span`
  background: var(--primary-bg-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
`;

const PlaylistCount = styled(PlayerCount)``;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const CurrentAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid var(--primary-bg-color);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 0, 224, 0.4);
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarPicker = styled.div`
  flex: 1;
`;

const AvatarLabel = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0.5rem 0;
`;

const AvatarGrid = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const AvatarOption = styled.div<{ $color: string; $selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  transition: all 0.2s;
  border: 3px solid ${({ $selected }) => ($selected ? "white" : "transparent")};
  transform: ${({ $selected }) => ($selected ? "scale(1.1)" : "scale(1)")};

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 10px ${({ $color }) => $color};
  }
`;

const UsernameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const UsernameLabel = styled.label`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
`;

const UsernameInput = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid rgba(255, 0, 224, 0.3);
  background-color: rgba(16, 28, 59, 0.8);
  color: var(--primary-text-color);
  outline: none;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    border-color: var(--primary-bg-color);
    box-shadow: 0 0 15px rgba(255, 0, 224, 0.3);
  }
`;

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-bg-color);
    border-radius: 3px;
  }
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid var(--primary-bg-color);
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(5px);
  }
`;

const PlaylistImage = styled.div<{ $imageUrl: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const PlaylistInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const PlaylistName = styled.p`
  margin: 0;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChoosePlaylistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: transparent;
  border: 2px dashed rgba(255, 0, 224, 0.4);
  border-radius: 10px;
  color: var(--primary-bg-color);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 0, 224, 0.1);
    border-color: var(--primary-bg-color);
  }
`;

const PlusIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-bg-color);
    border-radius: 3px;
  }
`;

const PlayerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 0, 224, 0.05));
  border-radius: 12px;
  border: 1px solid rgba(255, 0, 224, 0.2);
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 0, 224, 0.1));
    transform: translateX(5px);
  }
`;

const PlayerAvatar = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 10px ${({ $color }) => $color}80;
  flex-shrink: 0;
`;

const PlayerName = styled.span`
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
`;

const PlayerStatus = styled.span`
  font-size: 0.75rem;
  color: #33FF57;
  background: rgba(51, 255, 87, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  border: 1px solid rgba(51, 255, 87, 0.3);
`;

const WaitingSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: transparent;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
`;

const WaitingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.4);
`;

const WaitingText = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  flex-shrink: 0;
`;

const StartGameButton = styled.button`
  position: relative;
  background: linear-gradient(135deg, var(--primary-bg-color), #9900b3);
  border: none;
  border-radius: 50px;
  padding: 1rem 3rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px var(--primary-bg-color);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 2s infinite;

  @keyframes shine {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

const ButtonText = styled.span`
  position: relative;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
`;

