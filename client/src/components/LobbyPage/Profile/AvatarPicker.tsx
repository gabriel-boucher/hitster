import {Player, PlayerColor} from "../../../type/player/Player.ts";
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import useChangePlayerColor from "../../../hooks/http/room/useChangePlayerColor.ts";

interface AvatarPickerProps {
    userName: string;
}

export default function AvatarPicker({ userName }: AvatarPickerProps) {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ players }] = useRoomStateProvider();
    const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
    const colorMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (colorMenuRef.current && !colorMenuRef.current.contains(event.target as Node)) {
                setIsColorMenuOpen(false);
            }
        };

        if (isColorMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isColorMenuOpen]);

    const changePlayerColor = useChangePlayerColor();

    const currentPlayer = players.find((player: Player) => player.id === playerId);
    const currentColor = currentPlayer?.color || PlayerColor.RED;

    return (
        <AvatarPickerContainer ref={colorMenuRef}>
            <AvatarIcon
                $color={currentColor}
                onClick={() => setIsColorMenuOpen((prev) => !prev)}
            >
                <AvatarInitial>{userName.charAt(0).toUpperCase()}</AvatarInitial>
                <EditIcon>✎</EditIcon>
            </AvatarIcon>

            {isColorMenuOpen && (
                <AvatarMenuDropdown>
                    <AvatarMenuHeader>Select Color</AvatarMenuHeader>
                    <AvatarGrid>
                        {(Object.keys(PlayerColor) as PlayerColor[]).map((color: PlayerColor, index: number) => {
                            const isColorTaken = players.some((player: Player) => player.color === color && player.id !== playerId);
                            const isSelected = color === currentColor;

                            return (
                                <ColorSwatch
                                    key={index}
                                    $color={color}
                                    $selected={isSelected}
                                    $taken={isColorTaken}
                                    onClick={async () => {
                                        if (!isColorTaken) {
                                            await changePlayerColor(color);
                                            setIsColorMenuOpen(false);
                                        }
                                    }}
                                >
                                    {isColorTaken && <TakenLine />}
                                </ColorSwatch>
                            );
                        })}
                    </AvatarGrid>
                </AvatarMenuDropdown>
            )}
        </AvatarPickerContainer>
    )
}

const AvatarPickerContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const AvatarIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--lobby-white-20);
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px ${({ $color }) => $color}50;

  &:hover {
    transform: scale(1.05);
    border-color: var(--lobby-white-40);
    box-shadow: 0 6px 20px ${({ $color }) => $color}70;
  }
`;

const AvatarInitial = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px var(--lobby-black-30);
`;

const EditIcon = styled.div`
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--lobby-surface-dark);
    font-size: 0.6rem;
    color: white;
`;

const AvatarMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background: linear-gradient(135deg, var(--lobby-surface-gradient-start), var(--lobby-surface-gradient-end));
  border: 1px solid var(--lobby-accent-soft);
  border-radius: 16px;
  padding: 1rem;
  z-index: 100;
  box-shadow: 0 10px 40px var(--lobby-black-50);
  min-width: 220px;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 22px;
    transform: rotate(45deg);
    width: 12px;
    height: 12px;
    background: var(--lobby-surface-gradient-start);
    border-left: 1px solid var(--lobby-accent-soft);
    border-top: 1px solid var(--lobby-accent-soft);
  }
`;

const AvatarMenuHeader = styled.p`
  margin: 0 0 0.75rem 0;
  font-size: 0.75rem;
  color: var(--lobby-white-50);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const ColorSwatch = styled.div<{ $color: string; $selected: boolean; $taken: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ $color }) => $color};
  cursor: ${({ $taken }) => ($taken ? "not-allowed" : "pointer")};
  opacity: ${({ $taken }) => ($taken ? 0.4 : 1)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 2px solid ${({ $selected }) => ($selected ? "white" : "transparent")};
  box-shadow: ${({ $selected, $color }) => ($selected ? `0 0 12px ${$color}` : "none")};

  &:hover {
    transform: ${({ $taken }) => ($taken ? "none" : "scale(1.1)")};
  }
`;

const TakenLine = styled.div`
  position: absolute;
  width: 80%;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  transform: rotate(-45deg);
  border-radius: 1px;
`;