import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { socketEvents } from "@shared/Constants";

export default function LobbyPage() {
  const [{ socket, players }] = useStateProvider();

  function startGame() {
    socket.emit(socketEvents.START_GAME);
  }

  return (
    <Container>
      <img src="src/assets/hitster_title_logo.png" alt="Hitster Title Logo" />
      {players[0].socketId === socket.id && (
        <button onClick={startGame}>Start Game</button>
      )}
      <div className="player-list">
        <h2>Connected Players</h2>
        <ul>
          {players.map((player) => (
            <li key={player.socketId}>{player.name}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3%;
  background-color: #0a1d36;
  color: white;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  
  img {
    height: 20%;
    aspect-ratio: 401/112;
    margin-bottom: 50px;
  }

  button {
    background-color: rgb(255, 0, 98);
    border-radius: 5px;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;

    &:hover {
      background-color: rgb(255, 0, 98, 0.8);
    }
  }

  .player-list {
    margin-top: 20px;
    padding: 20px;
    border: 2px solid rgb(255, 0, 98);
    border-radius: 10px;
    width: 50%;

    h2 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        padding: 5px 0;
      }
    }
  }
`;
