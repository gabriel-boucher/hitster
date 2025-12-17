package domain.room;

import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import domain.game.GameStatus;
import domain.game.player.Player;
import domain.game.player.PlayerFactory;
import domain.game.player.PlayerId;
import domain.room.exception.PlayerInRoomException;
import domain.room.exception.PlaylistInRoomException;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;

import java.util.List;

public class Room {
    private final RoomId id;
    private final GameStatus gameStatus;
    private final List<Player> players;
    private final List<Playlist> playlists;
    private final PlayerFactory playerFactory;

    public Room(RoomId id, GameStatus gameStatus, List<Player> players, List<Playlist> playlists, PlayerFactory playerFactory) {
        this.id = id;
        this.gameStatus = gameStatus;
        this.players = players;
        this.playlists = playlists;
        this.playerFactory = playerFactory;
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
        validatePlayerNotExist(playerId);
        validateGameNotStarted();

        Player player = playerFactory.create(playerId);
        players.add(player);
    }

    public void addPlaylist(PlayerId playerId, Playlist playlist) {
        validatePlayerExist(playerId);
        validatePlaylistNotExist(playlist.id());

        playlists.add(playlist);
    }

    public void removePlaylist(PlayerId playerId, PlaylistId playlistId) {
        validatePlayerExist(playerId);
        validatePlaylistExist(playlistId);

        playlists.removeIf(playlist -> playlist.id().equals(playlistId));
    }

    public void validatePlayerExist(PlayerId playerId) {
        boolean playerExists = players.stream()
                .anyMatch(player -> player.getId().equals(playerId));
        if (!playerExists) {
            throw new PlayerNotFoundException(playerId);
        }
    }

    private void validatePlayerNotExist(PlayerId playerId) {
        boolean playerExists = players.stream()
                .anyMatch(player -> player.getId().equals(playerId));
        if (playerExists) {
            throw new PlayerInRoomException(playerId);
        }
    }

    private void validatePlaylistExist(PlaylistId playlistId) {
        boolean playlistExists = playlists.stream()
                .anyMatch(playlist -> playlist.id().equals(playlistId));
        if (!playlistExists) {
            throw new PlaylistNotFoundException(playlistId);
        }
    }

    private void validatePlaylistNotExist(PlaylistId playlistId) {
        boolean playlistExists = playlists.stream()
                .anyMatch(playlist -> playlist.id().equals(playlistId));
        if (playlistExists) {
            throw new PlaylistInRoomException(playlistId);
        }
    }

    private void validateGameNotStarted() {
        if (gameStatus != GameStatus.LOBBY) {
            throw new InvalidGameStatusException(gameStatus);
        }
    }
}
