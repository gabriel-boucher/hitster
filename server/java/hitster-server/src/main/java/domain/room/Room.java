package domain.room;

import domain.game.GameStatus;
import domain.player.Player;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;

import java.util.List;

public class Room {
    private final RoomId id;
    private final GameStatus gameStatus;
    private final List<Player> players;
    private final List<Playlist> playlists;
    private final PlayerFactory playerFactory;
    private final RoomValidator validator;

    public Room(RoomId id, GameStatus gameStatus, List<Player> players,
                List<Playlist> playlists, PlayerFactory playerFactory, RoomValidator validator) {
        this.id = id;
        this.gameStatus = gameStatus;
        this.players = players;
        this.playlists = playlists;
        this.playerFactory = playerFactory;
        this.validator = validator;
    }

    public RoomId getId() {
        return id;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    public void joinRoom(PlayerId playerId) {
        validator.validatePlayerCanJoin(playerId, players, gameStatus);
        Player player = playerFactory.create(playerId);
        players.add(player);
    }

    public void addPlaylist(PlayerId playerId, Playlist playlist) {
        validator.validatePlaylistCanBeAdded(playerId, playlist.id(), players, playlists, gameStatus);
        playlists.add(playlist);
    }

    public void removePlaylist(PlayerId playerId, PlaylistId playlistId) {
        validator.validatePlaylistCanBeRemoved(playerId, playlistId, players, playlists, gameStatus);
        playlists.removeIf(playlist -> playlist.id().equals(playlistId));
    }

    public void searchPlaylists(PlayerId playerId) {
        validator.validatePlayerCanSearchPlaylists(playerId, players);
    }
}