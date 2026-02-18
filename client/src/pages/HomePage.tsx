import styled from "styled-components";
import useCreateRoom from "../hooks/http/room/useCreateRoom.ts";

export default function HomePage() {
  const createRoom = useCreateRoom();

  return (
    <Container>
      <Title>HITSTER</Title>
      <CreateRoomButton onClick={createRoom}>Create Room</CreateRoomButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-text-color);
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
    font-size: 8rem;
    margin-bottom: 2rem;
    color: var(--primary-bg-color);
    text-shadow: 0 0 10px var(--primary-bg-color), 0 0 25px var(--primary-bg-color);
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

const CreateRoomButton = styled.button`
    background-color: var(--primary-bg-color);
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1.4rem;
    font-weight: bold;
    border-radius: 12px;
    color: var(--primary-text-color);
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 5rem;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px var(--primary-bg-color);
    }
`;
