package domain.room;

import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import domain.game.GameStatus;
import domain.player.Player;
import domain.player.PlayerId;
import domain.room.exception.*;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;

import java.util.List;

public class RoomValidator {

    public void validatePlayerCanJoin(PlayerId playerId, List<Player> players, GameStatus gameStatus) {
        validatePlayerNotExist(playerId, players);
        validateGameNotStarted(gameStatus);
    }

    public void validatePlaylistCanBeAdded(PlayerId playerId, PlaylistId playlistId,
                                           List<Player> players, List<Playlist> playlists, GameStatus gameStatus) {
        validatePlayerExist(playerId, players);
        validatePlaylistNotExist(playlistId, playlists);
        validateGameNotStarted(gameStatus);
    }

    public void validatePlaylistCanBeRemoved(PlayerId playerId, PlaylistId playlistId,
                                             List<Player> players, List<Playlist> playlists, GameStatus gameStatus) {
        validatePlayerExist(playerId, players);
        validatePlaylistExist(playlistId, playlists);
        validateGameNotStarted(gameStatus);
    }

    public void validatePlayerCanSearchPlaylists(PlayerId playerId, List<Player> players) {
        validatePlayerExist(playerId, players);
    }

    private void validatePlayerExist(PlayerId playerId, List<Player> players) {
        boolean playerExists = players.stream()
                .anyMatch(player -> player.getId().equals(playerId));
        if (!playerExists) {
            throw new PlayerNotFoundException(playerId);
        }
    }

    private void validatePlayerNotExist(PlayerId playerId, List<Player> players) {
        boolean playerExists = players.stream()
                .anyMatch(player -> player.getId().equals(playerId));
        if (playerExists) {
            throw new PlayerInRoomException(playerId);
        }
    }

    private void validatePlaylistExist(PlaylistId playlistId, List<Playlist> playlists) {
        boolean playlistExists = playlists.stream()
                .anyMatch(playlist -> playlist.id().equals(playlistId));
        if (!playlistExists) {
            throw new PlaylistNotFoundException(playlistId);
        }
    }

    private void validatePlaylistNotExist(PlaylistId playlistId, List<Playlist> playlists) {
        boolean playlistExists = playlists.stream()
                .anyMatch(playlist -> playlist.id().equals(playlistId));
        if (playlistExists) {
            throw new PlaylistInRoomException(playlistId);
        }
    }

    private void validateGameNotStarted(GameStatus gameStatus) {
        if (gameStatus != GameStatus.LOBBY) {
            throw new InvalidGameStatusException(gameStatus);
        }
    }
}