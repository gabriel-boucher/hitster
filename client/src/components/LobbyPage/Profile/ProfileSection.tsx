import styled from "styled-components";
import { useState, useEffect } from "react";
import useChangePlayerName from "../../../hooks/http/room/useChangePlayerName.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useRoomStateProvider } from "../../../stateProvider/room/RoomStateProvider.tsx";
import Section from "../components/Section.tsx";
import AvatarPicker from "./AvatarPicker.tsx";
import SecondaryButton from "../../elements/SecondaryButton.tsx";
import InputText from "../../elements/InputText.tsx";

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

        <InputText
          placeholder="Enter your name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await changePlayerName(userName);
            }
          }}
          style={{ flex: 1 }}
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