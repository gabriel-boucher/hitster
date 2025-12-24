package domain.room;

import domain.game.GameStatus;
import domain.player.Player;
import domain.player.PlayerFactory;
import domain.spotify.Playlist;

import java.util.ArrayList;
import java.util.List;

public class RoomBuilder {
    private RoomId roomId = RoomId.create();
    private GameStatus gameStatus = GameStatus.LOBBY;
    private List<Player> players = new ArrayList<>();
    private List<Playlist> playlists = new ArrayList<>();
    private PlayerFactory playerFactory = new PlayerFactory();

    public RoomBuilder withRoomId(RoomId roomId) {
        this.roomId = roomId;
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

    public RoomBuilder withPlayerFactory(PlayerFactory playerFactory) {
        this.playerFactory = playerFactory;
        return this;
    }

    public Room build() {
        return new Room(roomId, gameStatus, players, playlists, playerFactory);
    }
}
