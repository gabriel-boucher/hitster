import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import { useStateProvider } from "../utils/StateProvider";
import { useState } from "react";
import { socketEvents } from "../../../Constants";

export default function HomePage() {
  const [{ socket }] = useStateProvider();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { roomId } = useParams();

  function createRoom() {
    if (userName === "") return;
    socket.emit(socketEvents.CREATE_ROOM, (roomId: string) => {
      joinRoom(roomId);
    });
  }

  function joinRoom(roomId: string) {
    if (userName === "") return;
    socket.emit(socketEvents.JOIN_ROOM, roomId, userName, (message: string) => {
      if (message) {
        setError(message);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        navigate(`/${roomId}`);
      }
    });
  }

  return (
    <Container>
      <img src="src/assets/hitster_title_logo.png" alt="Hitster Title Logo" />
      <div className="entries">
        <input className="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"></input>
        {roomId === undefined ? (
          <button className="room-button" onClick={createRoom}>Create a room</button>
        ) : (
          <button className="room-button" onClick={() => joinRoom(roomId)}>Join room</button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
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

  .entries {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 8%;
    width: 50%;

    .username {
      width: 80%;
      font-size: 2rem;
      padding: 0px 0px 0px 10px;
      border-radius: 10px 0px 0px 10px;
      border: 5px solid rgb(255, 0, 98);
    }

    .room-button {
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

  .error-message {
    color: red;
  }
`;