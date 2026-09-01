import {useEffect, useState} from "react";
import styled from "styled-components";
import PrimaryButton from "../components/elements/PrimaryButton.tsx";
import {useConnectionStateProvider} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import useJoinGame from "../hooks/http/room/useJoinGame.ts";
import useConnect from "../hooks/socket/connection/useConnect.ts";
import InputText from "../components/elements/InputText.tsx";
import GameCode from "../components/elements/GameCode.tsx";

export default function CreatePage() {
  const [{ roomId }] = useConnectionStateProvider();

  const [username, setUsername] = useState(localStorage.getItem("playerName") || "");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  useConnect();

  const joinGame = useJoinGame();

  const canJoin = username.trim().length > 0;

  const handleJoin = async () => {
    if (!canJoin) return;

    await joinGame(username);
  };

  useEffect(() => {
    if (!canJoin) {
      setUsernameErrorMessage("Username cannot be empty");
      return;
    }

    setUsernameErrorMessage("");
  }, [canJoin]);

  return (
    <Container>
      <Title>HITSTER</Title>
      <GameCode
        value={roomId}
        disabled={true}
      />
      <InputText
        placeholder="Enter your name..."
        value={username}
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") await handleJoin();
        }}
      />
      {usernameErrorMessage.length > 0 && (
        <div>
          {usernameErrorMessage}
        </div>
      )}

      <PrimaryButton onClick={handleJoin} disabled={!canJoin}>
        Create
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

