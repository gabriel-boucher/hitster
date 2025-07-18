import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { socketEvents } from "@shared/Constants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PINK_COLOR__HEX } from "src/utils/Constants";

export default function LobbyPage() {
  const [{ socket, players }] = useStateProvider();
  const [userName, setUserName] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const roomId = params.get("code");

  useEffect(() => {
    if (roomId) {
      socket.emit(socketEvents.JOIN_ROOM, roomId);
    }
  }, [roomId, socket]);

  function changeName() {
    socket.emit(socketEvents.CHANGE_NAME, userName);
    console.log("start game");
  }

  function startGame() {
    // if (players.some((player) => !player.name)) return;
    socket.emit(socketEvents.START_GAME);
  }

  return (
    <Container>
      <Logo>HITSTER</Logo>
      <Entries>
        <input
          className="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name..."
        />
        <button className="chose-name-button" onClick={changeName}>
          Chose Name
        </button>
      </Entries>

      <PlayerList>
        <h2>Connected Players</h2>
        <ul>
          {players.filter((player) => player.name).map((player) => (
            <li key={player.socketId}>{player.name}</li>
          ))}
        </ul>
      </PlayerList>

      {players.length > 0 && players[0].socketId === socket.id && (
        <StartButton onClick={startGame}>Start Game</StartButton>
      )}
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
  font-family: 'Poppins', sans-serif;
`;

const Logo = styled.h1`
  font-size: 8rem;
  margin-bottom: 2rem;
  color: ${PINK_COLOR__HEX};
  text-shadow: 0 0 10px ${PINK_COLOR__HEX}, 0 0 20px ${PINK_COLOR__HEX};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { text-shadow: 0 0 10px ${PINK_COLOR__HEX}; }
    50% { text-shadow: 0 0 30px ${PINK_COLOR__HEX}; }
    100% { text-shadow: 0 0 10px ${PINK_COLOR__HEX}; }
  }
`;

const Entries = styled.div`
  display: flex;
  width: 60%;
  max-width: 500px;
  margin-bottom: 2rem;

  .username {
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
  }

  .chose-name-button {
    /* background: linear-gradient(to right, #00f2ff, ${PINK_COLOR__HEX}); */
    background-color: #00f2ff;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    border: 2px solid #00f2ff;
    border-left: none;
    border-radius: 0 12px 12px 0;
    cursor: pointer;
    /* transition: 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px ${PINK_COLOR__HEX};
    } */
  }
`;

const PlayerList = styled.div`
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
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.07);
      margin: 0.3rem 0;
      border-left: 4px solid #00f2ff;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background: #101c3b;
        transform: translateX(5px);
      }
    }
  }
`;

const StartButton = styled.button`
  /* background: linear-gradient(to right, ${PINK_COLOR__HEX}, #00f2ff); */
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
