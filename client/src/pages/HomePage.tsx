import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import { useState } from "react";
import { socketEvents } from "@shared/Constants";

// Album qui défile dans le background
// User images

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
      <Logo>
        <img src="src/assets/hitster_title_logo.png" alt="Hitster Title Logo" />
      </Logo>
      <Entries>
        <input
          className="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        ></input>
        {roomId === undefined ? (
          <button className="room-button" onClick={createRoom}>
            Create room
          </button>
        ) : (
          <button className="room-button" onClick={() => joinRoom(roomId)}>
            Join room
          </button>
        )}
      </Entries>
      {error && <Error>{error}</Error>}
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
  gap: 10%;

  &::before {
    content: "";
    position: absolute;
    background: linear-gradient(purple, orangered);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  }
`;

const Logo = styled.div`
  height: 20%;
  width: 60%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;

  &::before {
    content: "";
    position: absolute;
    background: linear-gradient(cyan, yellow);
    border-radius: 10px;
    top: -10px;
    left: -10px;
    bottom: -10px;
    right: -10px;
    z-index: -1;
    border: 1px solid black;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Entries = styled.div`
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
    /* border: 5px solid rgb(255, 0, 98); */
    /* border: 5px solid black; */
    border-right: none;
    &:focus {
      outline: none;
    }
  }

  .room-button {
    width: 20%;
    font-size: 1.5rem;
    background-color: rgb(255, 0, 98);
    background-color: cyan;
    /* border: 5px solid rgb(255, 0, 98); */
    /* border: 5px solid black; */
    border-left: none;
    border-radius: 0px 10px 10px 0px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #03e9e9;
    }
  }
`;

const Error = styled.p`
  color: red;
`;
