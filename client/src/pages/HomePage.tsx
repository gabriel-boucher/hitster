import styled from "styled-components";
import useCreateRoom from "../hooks/http/room/useCreateRoom.ts";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {useConnectionStateProvider} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import {useResetAllStates} from "../hooks/useResetAllStates.ts";
import PrimaryButton from "../components/elements/PrimaryButton.tsx";

export default function HomePage() {
  const [{ socket }] = useConnectionStateProvider();
  const navigate = useNavigate();
  const resetAllStates = useResetAllStates();

  const createRoom = useCreateRoom();
  const joinRoom = () => navigate("/join");

  useEffect(() => {
    resetAllStates();
    if (socket) socket.disconnect();
  }, [resetAllStates, socket]);

  return (
    <Container>
      <Title>HITSTER</Title>
      <PrimaryButton onClick={createRoom} style={{ width: "14rem" }}>Create</PrimaryButton>
      <PrimaryButton onClick={joinRoom} style={{ width: "14rem" }}>Join</PrimaryButton>
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
  gap: 2rem;
  color: var(--primary-text-color);
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
    font-size: 8rem;
    margin: 0;
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color), 0 0 25px var(--primary-color);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            text-shadow: 0 0 10px var(--primary-color);
        }
        50% {
            text-shadow: 0 0 20px var(--primary-color);
        }
        100% {
            text-shadow: 0 0 10px var(--primary-color);
        }
    }
`;
