import styled from "styled-components";
import { useState, useEffect } from "react";
import useChangePlayerName from "../../../hooks/http/room/useChangePlayerName.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useRoomStateProvider } from "../../../stateProvider/room/RoomStateProvider.tsx";
import Section from "../components/Section.tsx";
import AvatarPicker from "./AvatarPicker.tsx";
import SecondaryButton from "../elements/SecondaryButton.tsx";

export default function ProfileSection() {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ players }] = useRoomStateProvider();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentPlayer = players.find((p) => p.id === playerId);
    if (currentPlayer?.name) {
      setUserName(currentPlayer.name);
    }
  }, [players, playerId]);

  const changePlayerName = useChangePlayerName();

  return (
    <Section title="Profile" flexShrink>
      <ProfileRow>
        <AvatarPicker userName={userName} />

        <UsernameInput
          placeholder="Enter your name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await changePlayerName(userName);
            }
          }}
        />
      </ProfileRow>

      <SecondaryButton onClick={() => changePlayerName(userName)}>
        Change Username
      </SecondaryButton>
    </Section>
  );
}

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UsernameInput = styled.input`
    flex: 1;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    border-radius: 12px;
    border: 1px solid var(--lobby-accent-softer);
    background: var(--lobby-black-30);
    color: var(--primary-text-color);
    outline: none;
    transition: all 0.3s;
    min-width: 0;

    &::placeholder {
        color: var(--lobby-white-30);
    }

    &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 20px var(--lobby-accent-softer);
    }
`;