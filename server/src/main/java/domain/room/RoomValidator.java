package domain.room;

import domain.game.GameStatus;
import domain.game.GameValidator;
import domain.player.Player;
import domain.player.PlayerColor;
import domain.player.PlayerId;
import domain.player.PlayerValidator;
import domain.room.exception.*;
import domain.music.Playlist;
import domain.music.PlaylistId;
import domain.music.PlaylistValidator;

import java.util.List;

public class RoomValidator {
    private final PlayerValidator playerValidator;
    private final PlaylistValidator playlistValidator;
    private final GameValidator gameValidator;

    public RoomValidator(PlayerValidator playerValidator, PlaylistValidator playlistValidator, GameValidator gameValidator) {
        this.playerValidator = playerValidator;
        this.playlistValidator = playlistValidator;
        this.gameValidator = gameValidator;
    }

    public void validatePlayerCanJoin(PlayerId playerId, List<Player> players, GameStatus gameStatus) {
        playerValidator.validatePlayerNotExist(playerId, players);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);
    }

    public void validatePlayerCanChangeAuthType(PlayerId playerId, List<Player> players, GameStatus gameStatus) {
        playerValidator.validatePlayerExist(playerId, players);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);

    }

    public Player validatePlayerCanChangeName(PlayerId playerId, String newName, List<Player> players, GameStatus gameStatus) {
        Player player = playerValidator.validatePlayerExist(playerId, players);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);

        boolean nameAlreadyUsed = players.stream()
                .anyMatch(p ->
                        p.getName().equals(newName) &&
                        !p.getId().equals(playerId)
                );

        if (nameAlreadyUsed) {
            throw new PlayerNameAlreadyExistsException(playerId, newName);
        }

        return player;
    }

    public Player validatePlayerCanChangeColor(PlayerId playerId, PlayerColor newColor, List<Player> players, GameStatus gameStatus) {
        Player player = playerValidator.validatePlayerExist(playerId, players);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);

        boolean colorAlreadyUsed = players.stream()
                .anyMatch(p ->
                        p.getColor().equals(newColor) &&
                        !p.getId().equals(playerId)
                );

        if (colorAlreadyUsed) {
            throw new PlayerColorAlreadyExistsException(playerId, newColor);
        }

        return player;
    }

    public void validateCanRemovePlayer(PlayerId playerId, PlayerId playerToRemoveId, List<Player> players, GameStatus gameStatus) {
        playerValidator.validatePlayerExist(playerId, players);
        playerValidator.validatePlayerExist(playerToRemoveId, players);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);

        if (!players.getFirst().getId().equals(playerId) || playerId.equals(playerToRemoveId)) {
            throw new PlayerHostCannotBeRemovedException(playerId);
        }
    }

    public void validatePlaylistCanBeAdded(PlayerId playerId, PlaylistId playlistId,
                                           List<Player> players, List<Playlist> playlists, GameStatus gameStatus) {
        playerValidator.validatePlayerExist(playerId, players);
        playlistValidator.validatePlaylistNotExist(playlistId, playlists);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);
    }

    public void validatePlaylistCanBeRemoved(PlayerId playerId, PlaylistId playlistId,
                                             List<Player> players, List<Playlist> playlists, GameStatus gameStatus) {
        playerValidator.validatePlayerExist(playerId, players);
        playlistValidator.validatePlaylistExist(playlistId, playlists);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);
    }

    public void validatePlayerCanStartGame(PlayerId playerId, List<Player> players, List<Playlist> playlists, GameStatus gameStatus) {
        playerValidator.validatePlayerExist(playerId, players);
        gameValidator.validateGameStatus(gameStatus, GameStatus.LOBBY);

        if (!players.getFirst().getId().equals(playerId)) {
            throw new PlayerHostMustStartGameException(playerId);
        }
        if (playlists.isEmpty()) {
            throw new NoPlaylistSelectedException();
        }
        if(players.stream().anyMatch(player -> player.getName().isBlank())) {
            throw new PlayerNameNotSetException();
        }
    }
}