import {useEffect, useState} from "react";
import styled from "styled-components";
import PrimaryButton from "../components/elements/PrimaryButton.tsx";
import useConnectRoom from "../hooks/http/room/useConnectRoom.ts";
import {useConnectionStateProvider} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../stateProvider/connection/ConnectionReducerCases.ts";
import useJoinGame from "../hooks/http/room/useJoinGame.ts";
import useConnect from "../hooks/socket/connection/useConnect.ts";
import {useLocation} from "react-router-dom";
import InputText from "../components/elements/InputText.tsx";
import GameCode, {CHARS, LENGTH} from "../components/elements/GameCode.tsx";

export default function JoinPage() {
  const [{ roomId }, connectionDispatch] = useConnectionStateProvider();
  const location = useLocation();

  const [username, setUsername] = useState(localStorage.getItem("playerName") || "");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [disableRoomIdInput, setDisableRoomIdInput] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [disableUsernameInput, setDisableUsernameInput] = useState(true);
  const [roomIdErrorMessage, setRoomIdErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  useConnect();

  const joinRoom = useJoinGame();

  const canJoin = username.trim().length > 0 && !usernames.includes(username) || disableUsernameInput;

  const handleJoin = async () => {
    if (!canJoin) return;

    await joinRoom(username);
  };

  useEffect(() => {
    const locationRoomId = location.pathname.split("/")[1];

    if (locationRoomId === "join" || locationRoomId === "create" || locationRoomId.length != LENGTH) {
      setDisableRoomIdInput(false);
      return;
    }

    for (let i = 0; i < locationRoomId.length; i++) {
      if (CHARS.indexOf(locationRoomId.charAt(i)) == -1) {
        setDisableRoomIdInput(false);
        return;
      }
    }

    connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: locationRoomId });
    setDisableRoomIdInput(true);
  }, [connectionDispatch, location.pathname]);

  useEffect(() => {
    if (username.trim().length === 0) {
      setUsernameErrorMessage("Username cannot be empty");
      return;
    }

    if (usernames.includes(username) && !disableUsernameInput) {
      setUsernameErrorMessage("Username already taken");
      return;
    }

    setUsernameErrorMessage("");
  }, [disableUsernameInput, username, usernames]);

  useConnectRoom({
    setUsername,
    setUsernames,
    setShowUsernameInput,
    setDisableUsernameInput,
    setRoomIdErrorMessage
  });

  return (
    <Container>
      <Title>HITSTER</Title>
      <GameCode
        value={roomId}
        disabled={disableRoomIdInput}
        autoFocus
        onChange={(value) => connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: value })}
      />
      {roomIdErrorMessage.length > 0 && (
        <div>
          {roomIdErrorMessage}
        </div>
      )}
      {showUsernameInput && (
        <>
          <InputText
            placeholder="Enter your name..."
            value={username}
            disabled={disableUsernameInput}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleJoin();
            }}
            style={{ width: "13.8vw" }}
          />
          {usernameErrorMessage.length > 0 && (
            <div>
              {usernameErrorMessage}
            </div>
          )}
        </>
      )}

      <PrimaryButton onClick={handleJoin} disabled={!canJoin}>
        Join
      </PrimaryButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100vh;
  width: 100vw;
  color: var(--primary-text-color);
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--primary-color), 0 0 25px var(--primary-color);
`;

