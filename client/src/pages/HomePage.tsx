import styled from "styled-components";
import {getSpotifyAuthUrl, PINK_COLOR__HEX} from "src/utils/constants";

interface Props {
  setLoading: (loading: boolean) => void;
}

export default function HomePage({ setLoading }: Props) {
  const authorization = () => {
    setLoading(true);
    window.location.href = getSpotifyAuthUrl();
  }

  return (
    <Container>
      <Title>HITSTER</Title>
      <CreateRoomButton onClick={authorization}>Create Room</CreateRoomButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin-bottom: 2rem;
  color: ${PINK_COLOR__HEX};
  text-shadow: 0 0 10px ${PINK_COLOR__HEX}, 0 0 25px ${PINK_COLOR__HEX};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { text-shadow: 0 0 10px ${PINK_COLOR__HEX}; }
    50% { text-shadow: 0 0 30px ${PINK_COLOR__HEX}; }
    100% { text-shadow: 0 0 10px ${PINK_COLOR__HEX}; }
  }
`;

const CreateRoomButton = styled.button`
  /* background: linear-gradient(to right, #00f2ff, ${PINK_COLOR__HEX}); */
  background-color: ${PINK_COLOR__HEX};
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 5rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px ${PINK_COLOR__HEX};
  }
`;
