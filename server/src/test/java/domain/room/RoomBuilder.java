package domain.room;

import domain.game.GameFactory;
import domain.game.GameStatus;
import domain.game.GameValidator;
import domain.player.Player;
import domain.player.PlayerFactory;
import domain.player.PlayerValidator;
import domain.music.Playlist;
import domain.music.PlaylistValidator;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessToken;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenId;

import java.util.ArrayList;
import java.util.List;

public class RoomBuilder {
    private RoomId roomId = RoomId.create();
    private SpotifyAccessToken spotifyAccessToken = new SpotifyAccessToken(new SpotifyAccessTokenId("testToken"), 3600, new SpotifyAccessTokenId("testRefreshToken"));
    private GameStatus gameStatus = GameStatus.LOBBY;
    private List<Player> players = new ArrayList<>();
    private List<Playlist> playlists = new ArrayList<>();
    private GameFactory gameFactory = new GameFactory();
    private PlayerFactory playerFactory = new PlayerFactory();
    private RoomValidator roomValidator = new RoomValidator(new PlayerValidator(), new PlaylistValidator(), new GameValidator());

    public RoomBuilder withRoomId(RoomId roomId) {
        this.roomId = roomId;
        return this;
    }

    public RoomBuilder withAccessToken(SpotifyAccessToken spotifyAccessToken) {
        this.spotifyAccessToken = spotifyAccessToken;
        return this;
    }

    public RoomBuilder withGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
        return this;
    }

    public RoomBuilder withPlayers(List<Player> players) {
        this.players = players;
        return this;
    }

    public RoomBuilder withPlaylists(List<Playlist> playlists) {
        this.playlists = playlists;
        return this;
    }

    public RoomBuilder withGameFactory(GameFactory gameFactory) {
        this.gameFactory = gameFactory;
        return this;
    }

    public RoomBuilder withPlayerFactory(PlayerFactory playerFactory) {
        this.playerFactory = playerFactory;
        return this;
    }

    public RoomBuilder withRoomValidator(RoomValidator roomValidator) {
        this.roomValidator = roomValidator;
        return this;
    }

    public Room build() {
        return new Room(roomId, spotifyAccessToken, gameStatus, players, playlists, gameFactory, playerFactory, roomValidator);
    }
}
