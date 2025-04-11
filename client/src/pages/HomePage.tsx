import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function HomePage() {
  const [{ socket, players }, dispatch] = useStateProvider();

  socket.on(
    "updateGameState",
    ({ players, activePlayer, items, activeCard }) => {
      console.log("Players received:", players);
      dispatch({ type: reducerCases.SET_PLAYERS, players });
      dispatch({ type: reducerCases.SET_ACTIVE_PLAYER, activePlayer });
      dispatch({ type: reducerCases.SET_ITEMS, items });
      dispatch({ type: reducerCases.SET_ACTIVE_CARD, activeCard });
    }
  );

  function createRoom() {
    socket.emit("createRoom");
  }

  return (
    <Container>
      <img src="src/assets/hitster_title_logo.png" alt="Hitster Title Logo" />
      <div className="entries">
        <input className="nickname" placeholder="Nickname"></input>
        <button className="create-room" onClick={createRoom}>Create a room</button>
      </div>
      <div className="player-list">
        <h3>Connected Players:</h3>
        <ul>
          {players.map((player) => (
            <li key={player.socketId}>
              Player ID: {player.socketId} - Name: {player.name}
            </li>
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

  img {
    height: 20%;
    aspect-ratio: 401/112;
    margin-bottom: 50px;
  }

  .entries {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 8%;
    width: 50%;

    .nickname {
      width: 80%;
      font-size: 2rem;
      padding: 0px 0px 0px 10px;
      border-radius: 10px 0px 0px 10px;
      border: 5px solid rgb(255, 0, 98);
    }

    .create-room {
      width: 20%;
      background-color: rgb(255, 0, 98);
      border: 5px solid rgb(255, 0, 98);
      border-radius: 0px 10px 10px 0px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .player-list {
    margin-top: 20px;
    padding: 20px;
    border: 2px solid rgb(255, 0, 98);
    border-radius: 10px;
    width: 50%;
    
    h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
      
      li {
        padding: 5px 0;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
`;