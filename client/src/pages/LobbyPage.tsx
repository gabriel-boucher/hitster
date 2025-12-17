import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { socketEvents } from "@shared/constants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PINK_COLOR__HEX, reducerCases } from "src/utils/constants";
import PlayerInLobby from "src/components/elements/Player/PlayerInLobby";
import { PlayerInterface, PlaylistInterface } from "@shared/interfaces";
import { SpotifyModal } from "src/components/GamePage/SpotifyModal/SpotifyModal";

export default function LobbyPage() {
  const [{ socket, gameState, items, players }, dispatch] = useStateProvider();
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState<
    PlaylistInterface[]
  >([]);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const roomId = params.get("code");

  useEffect(() => {
    if (roomId) {
      dispatch({ type: reducerCases.SET_ROOM_ID, roomId: roomId || "" });
      socket.emit(socketEvents.JOIN_ROOM, roomId);
    }
  }, [roomId, socket, dispatch]);

  const changePlayerImage = (image: string) => {
    if (
      !image ||
      players.some((player: PlayerInterface) => player.image === image)
    )
      return;

    const newPlayers = players.map((player: PlayerInterface) =>
      player.socketId === socket.id ? { ...player, image } : player
    );
    socket.emit(socketEvents.UPDATE_GAME_STATE, {
      gameState,
      players: newPlayers,
      items,
    });
  };

  function changePlayerName() {
    if (!userName || players.some((player) => player.name === userName)) return;

    const newPlayers = players.map((player) =>
      player.socketId === socket.id ? { ...player, name: userName } : player
    );
    socket.emit(socketEvents.UPDATE_GAME_STATE, {
      gameState,
      players: newPlayers,
      items,
    });
  }

  function removePlayer(socketId: string) {
    const newPlayers = players.map((player) =>
      player.socketId === socketId ? { ...player, name: "" } : player
    );
    socket.emit(socketEvents.UPDATE_GAME_STATE, {
      gameState,
      players: newPlayers,
      items,
    });
  }

  function startGame() {
    if (
      players.some((player) => !player.name) ||
      selectedPlaylists.length === 0
    )
      return;
    socket.emit(socketEvents.START_GAME, selectedPlaylists );
  }

  function addSelectedPlaylist(playlist: PlaylistInterface) {
    setSelectedPlaylists([...selectedPlaylists, playlist]);
  }

  function removeSelectedPlaylist(playlistId: string) {
    setSelectedPlaylists(
      selectedPlaylists.filter((playlist) => playlist.id !== playlistId)
    );
  }

  return (
    <Container>
      <Logo>HITSTER</Logo>
      <Entries>
        <PlayerInLobby changePlayerImage={changePlayerImage} />
        <NameContainer>
          <NameInput
            className="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name..."
          />
          <JoinButton onClick={changePlayerName}>Join</JoinButton>
        </NameContainer>
      </Entries>

      <PlayerList>
        <h2>Connected Players</h2>
        <ul>
          {players
            .filter((player) => player.name)
            .map((player) => (
              <li key={player.socketId}>
                <PlayerImg $playerImage={player.image} />
                <NameBase>{player.name}</NameBase>
                {socket.id === players[0].socketId && (
                  <RemoveButton onClick={() => removePlayer(player.socketId)}>
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
          {selectedPlaylists?.map((playlist) => (
            <li key={playlist.id}>
              <PlaylistImg $playlistImage={playlist.images[0].url} />
              <NameBase>{playlist.name}</NameBase>
              {socket.id === players[0].socketId && (
                <RemoveButton
                  onClick={() => removeSelectedPlaylist(playlist.id)}
                >
                  -
                </RemoveButton>
              )}
            </li>
          ))}
        </ul>
      </PlaylistList>

      <ButtonsContainer>
        {players.length > 0 && players[0].socketId === socket.id && (
          <StartButton onClick={startGame}>Start Game</StartButton>
        )}
        <PlaylistButton onClick={() => setIsModalOpen(true)}>
          Choose playlist
        </PlaylistButton>
        <SpotifyModal
          selectedPlaylists={selectedPlaylists}
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          addSelectedPlaylist={addSelectedPlaylist}
          removeSelectedPlaylist={removeSelectedPlaylist}
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
  color: white;
  font-family: "Poppins", sans-serif;
`;

const Logo = styled.h1`
  font-size: 8rem;
  margin-bottom: 2rem;
  color: ${PINK_COLOR__HEX};
  text-shadow: 0 0 10px ${PINK_COLOR__HEX}, 0 0 20px ${PINK_COLOR__HEX};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      text-shadow: 0 0 10px ${PINK_COLOR__HEX};
    }
    50% {
      text-shadow: 0 0 30px ${PINK_COLOR__HEX};
    }
    100% {
      text-shadow: 0 0 10px ${PINK_COLOR__HEX};
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
  color: white;
  outline: none;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    box-shadow: 0 0 10px #00f2ff;
  }
`;

const JoinButton = styled.button`
  background-color: #00f2ff;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
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

const PlayerImg = styled(ImgBase)<{ $playerImage: string }>`
  border-radius: 50%;
  background-color: ${({ $playerImage }) => $playerImage};
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
    margin-top: 0rem;
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
  background-color: ${PINK_COLOR__HEX};
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 5rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 12px ${PINK_COLOR__HEX};
  }
`;

const PlaylistButton = styled.button`
  background-color: ${PINK_COLOR__HEX};
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 5rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 12px ${PINK_COLOR__HEX};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
