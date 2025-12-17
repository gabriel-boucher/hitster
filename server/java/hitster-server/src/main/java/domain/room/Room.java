package domain.room;

import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import domain.game.player.Player;
import domain.game.player.PlayerFactory;
import domain.game.player.PlayerId;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;

import java.util.List;

public class Room {
    private final RoomId id;
    private final List<Player> players;
    private final List<Playlist> playlists;
    private final PlayerFactory playerFactory;

    public Room(RoomId id, List<Player> players, List<Playlist> playlists, PlayerFactory playerFactory) {
        this.id = id;
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

    private void validatePlayerExist(PlayerId playerId) {
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
            throw new IllegalArgumentException("Player with ID " + playerId + " already joined the room.");
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
            throw new IllegalArgumentException("Playlist with ID " + playlistId + " already added to the room.");
        }
    }
}
