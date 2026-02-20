import {MusicPlayerType} from "../../../../type/music/MusicPlayerType.ts";
import styled from "styled-components";
import {useRoomStateProvider} from "../../../../stateProvider/room/RoomStateProvider.tsx";
import useInMemoryAuth from "../../../../hooks/http/auth/useInMemoryAuth.ts";
import useSpotifyAuth from "../../../../hooks/http/auth/useSpotifyAuth.ts";

export default function SearchPlaylistsAuth() {
    const [{ musicPlayerType }] = useRoomStateProvider();

    const inMemoryAuth = useInMemoryAuth();
    const spotifyAuth = useSpotifyAuth();

    return (
        <AuthContainer>
            <InMemoryAuthButton
                onClick={async () => {
                    if (musicPlayerType === MusicPlayerType.IN_MEMORY) return;
                    await inMemoryAuth();
                }}
                $isSelected={musicPlayerType === MusicPlayerType.IN_MEMORY}
                title="Use In-Memory Auth"
            >
                <ButtonIcon className="memory-icon" />
            </InMemoryAuthButton>
            <SpotifyAuthButton
                onClick={async () => {
                    if (musicPlayerType === MusicPlayerType.SPOTIFY) return;
                    await spotifyAuth();
                }}
                $isSelected={musicPlayerType === MusicPlayerType.SPOTIFY}
                title="Connect with Spotify"
            >
                <ButtonIcon className="spotify-icon" />
            </SpotifyAuthButton>
        </AuthContainer>
    )
}

const AuthContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1rem;
    width: 100%;
`;

const AuthButton = styled.button<{ $isSelected: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: ${props => props.$isSelected ? 1 : 0.4};
    transform: ${props => props.$isSelected ? 'scale(1.02)' : 'scale(1)'};
    
    &:hover {
        opacity: ${props => props.$isSelected ? 1 : 0.7};
    }
`;

const InMemoryAuthButton = styled(AuthButton)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
        opacity: 0.9;
    }
`;

const SpotifyAuthButton = styled(AuthButton)`
    background: linear-gradient(135deg, #169c46 0%, #18a049 100%);
    color: white;
    
    &:hover {
        opacity: 0.9;
    }
`;

const ButtonIcon = styled.span`
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    &.memory-icon::before {
        content: "";
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 6.42187C2 5.17923 3.00736 4.17188 4.25 4.17188H19.75C20.9926 4.17188 22 5.17923 22 6.42188V13.8281C22 15.0708 20.9926 16.0781 19.75 16.0781H12.75V18.3281H15C15.4142 18.3281 15.75 18.6639 15.75 19.0781C15.75 19.4923 15.4142 19.8281 15 19.8281H9.00003C8.58582 19.8281 8.25003 19.4923 8.25003 19.0781C8.25003 18.6639 8.58582 18.3281 9.00003 18.3281H11.25V16.0781H4.25C3.00736 16.0781 2 15.0708 2 13.8281V6.42187ZM4.25 5.67188C3.83579 5.67188 3.5 6.00766 3.5 6.42187V13.8281C3.5 14.2423 3.83579 14.5781 4.25 14.5781H19.75C20.1642 14.5781 20.5 14.2423 20.5 13.8281V6.42188C20.5 6.00766 20.1642 5.67188 19.75 5.67188H4.25Z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
    }
    
    &.spotify-icon::before {
        content: "";
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.45161 2 2 6.45161 2 12C2 17.5484 6.45161 22 12 22C17.5484 22 22 17.5484 22 12C22 6.45161 17.5484 2 12 2ZM16.5806 16.4194C16.3871 16.6774 16.0323 16.7742 15.7097 16.6452C13.3548 15.1935 10.3871 14.871 6.93548 15.6452C6.58064 15.7419 6.25806 15.5161 6.19355 15.1935C6.09677 14.8387 6.32258 14.5161 6.64516 14.4194C10.4516 13.5484 13.6774 13.9355 16.3871 15.5484C16.6774 15.7742 16.7742 16.129 16.5806 16.4194ZM17.8065 13.7419C17.5806 14.0968 17.0645 14.1935 16.7742 13.9677C14.0968 12.3226 10 11.8387 6.80645 12.8387C6.3871 12.9677 5.93548 12.7419 5.83871 12.2903C5.70968 11.871 5.93548 11.4194 6.3871 11.3226C10.0323 10.1935 14.5161 10.7742 17.6129 12.6452C17.9032 12.871 18.0323 13.3226 17.8065 13.7419ZM17.9032 10.871C14.6774 8.96774 9.35484 8.77419 6.25806 9.74194C5.80645 9.87097 5.25806 9.6129 5.12903 9.09677C5 8.64516 5.25806 8.09677 5.77419 7.96774C9.32258 6.93548 15.129 7.09677 18.871 9.32258C19.3226 9.58065 19.4516 10.1935 19.2258 10.5806C18.9677 11 18.3548 11.129 17.9032 10.871Z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
    }
`;