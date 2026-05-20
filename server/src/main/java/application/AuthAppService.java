package application;

import domain.connection.ConnectionServer;
import domain.exception.GameNotFoundException;
import domain.music.MusicPlayerType;
import domain.player.PlayerId;
import domain.room.Room;
import domain.game.GameId;
import domain.room.RoomRepository;
import infrastructure.musicAuth.spotify.auth.SpotifyAuthRepository;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;

public class AuthAppService {
    private final RoomRepository roomRepository;
    private final SpotifyAuthRepository spotifyAuthRepository;
    private final ConnectionServer connectionServer;

    public AuthAppService(RoomRepository roomRepository, SpotifyAuthRepository spotifyAuthRepository, ConnectionServer connectionServer) {
        this.roomRepository = roomRepository;
        this.spotifyAuthRepository = spotifyAuthRepository;
        this.connectionServer = connectionServer;
    }

    public void inMemoryAuth(GameId gameId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        room.changeMusicPlayerType(playerId, MusicPlayerType.IN_MEMORY);

        roomRepository.saveRoom(room);
        connectionServer.broadcastRoomState(room);
    }

    public void spotifyAuth(GameId gameId, PlayerId playerId, SpotifyAccessCode spotifyAccessCode) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));

        room.changeMusicPlayerType(playerId, MusicPlayerType.SPOTIFY);

        spotifyAuthRepository.setSpotifyApiTokenByAccessCode(gameId, spotifyAccessCode);
        roomRepository.saveRoom(room);
        connectionServer.broadcastRoomState(room);
    }
}
