import styled from "styled-components";
import { useState } from "react";
import PlayerInLobby from "src/components/elements/Player/PlayerInLobby";
import { SpotifyModal } from "../components/LobbyPage/SpotifyModal/SpotifyModal";
import useChangePlayerName from "../hooks/socket/room/useChangePlayerName.ts";
import useRemovePlayer from "../hooks/socket/room/useRemovePlayer.ts";
import useStartGame from "../hooks/socket/room/useStartGame.ts";
import useRemovePlaylist from "../hooks/socket/room/useRemovePlaylist.ts";
import {useConnectionStateProvider} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import {useRoomStateProvider} from "../stateProvider/room/RoomStateProvider.tsx";

interface Props {
  setLoading: (loading: boolean) => void;
}

export default function LobbyPage({ setLoading }: Props) {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ players, playlists }] = useRoomStateProvider();
  const [userName, setUserName] = useState(players.find((p) => p.id === playerId)?.name || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changePlayerName = useChangePlayerName();
  const removePlayer = useRemovePlayer();
  const removePlaylist = useRemovePlaylist();
  const startGame = useStartGame();

  return (
    <Container>
      <Logo>HITSTER</Logo>
      <Entries>
        <PlayerInLobby />
        <NameContainer>
          <NameInput
            className="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name..."
          />
          <ChangeNameButton onClick={() => changePlayerName(userName)}>Join</ChangeNameButton>
        </NameContainer>
      </Entries>

      <PlayerList>
        <h2>Connected Players</h2>
        <ul>
          {players
            .filter((player) => player.name)
            .map((player) => (
              <li key={player.id}>
                <PlayerImg $playerColor={player.color} />
                <NameBase>{player.name}</NameBase>
                {playerId === players[0].id && playerId != player.id && (
                  <RemoveButton onClick={() => removePlayer(player.id)}>
                    -
                  </RemoveButton>
                )}
              </li>
            ))}
        </ul>
      </PlayerList>

      <PlaylistList>
        <h2>Selected Playlists</h2>
        <ul>
          {playlists?.map((playlist) => (
            <li key={playlist.id}>
              <PlaylistImg $playlistImage={playlist.imageUrl} />
              <NameBase>{playlist.name}</NameBase>
              {playerId === players[0].id && (
                <RemoveButton
                  onClick={() => removePlaylist(playlist.id)}
                >
                  -
                </RemoveButton>
              )}
            </li>
          ))}
        </ul>
      </PlaylistList>

      <ButtonsContainer>
        {players.length > 0 && players[0].id === playerId && (
          <StartButton onClick={() => startGame(setLoading)}>Start Game</StartButton>
        )}
        <PlaylistButton onClick={() => setIsModalOpen(true)}>
          Choose playlist
        </PlaylistButton>
        <SpotifyModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-text-color);
  font-family: "Poppins", sans-serif;
`;

const Logo = styled.h1`
    font-size: 8rem;
    margin-bottom: 2rem;
    color: var(--primary-bg-color);
    text-shadow: 0 0 10px var(--primary-bg-color), 0 0 20px var(--primary-bg-color);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            text-shadow: 0 0 10px var(--primary-bg-color);
        }
        50% {
            text-shadow: 0 0 20px var(--primary-bg-color);
        }
        100% {
            text-shadow: 0 0 10px var(--primary-bg-color);
        }
    }
`;

const Entries = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  max-width: 550px;
  margin-bottom: 2rem;
  gap: 2vh;
`;

const NameContainer = styled.div`
  display: flex;
  width: 100%;
`;

const NameInput = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 12px 0 0 12px;
  border: 2px solid #00f2ff;
  background-color: #101c3b;
  color: var(--primary-text-color);
  outline: none;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    box-shadow: 0 0 10px #00f2ff;
  }
`;

const ChangeNameButton = styled.button`
  background-color: #00f2ff;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-text-color);
  border: 2px solid #00f2ff;
  border-left: none;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
`;

const ImgBase = styled.div`
  aspect-ratio: 1/1;
  width: 2vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const NameBase = styled.span`
  flex: 1;
`;

const PlayerImg = styled(ImgBase)<{ $playerColor: string }>`
  border-radius: 50%;
  background-color: ${({ $playerColor }) => $playerColor};
`;

const PlaylistImg = styled(ImgBase)<{ $playlistImage: string }>`
  border-radius: 10%;
  background-image: url(${({ $playlistImage }) => $playlistImage});
`;

const RemoveButton = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  background-color: red;
  width: 2vh;
  height: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: darkred;
  }
`;

const List = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #00f2ff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 60%;
  max-width: 500px;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.3rem;
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      line-height: 0.1rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.07);
      margin: 0.3rem 0;
      border-left: 4px solid #00f2ff;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        /* background: #101c3b; */
        /* transform: translateX(5px); */
      }
    }
  }
`;

const PlayerList = styled(List)``;

const PlaylistList = styled(List)``;

const StartButton = styled.button`
    background-color: var(--primary-bg-color);
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    color: var(--primary-text-color);
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 5rem;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 12px var(--primary-bg-color);
    }
`;

const PlaylistButton = styled.button`
    background-color: var(--primary-bg-color);
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    color: var(--primary-text-color);
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 5rem;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 12px var(--primary-bg-color);
    }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
