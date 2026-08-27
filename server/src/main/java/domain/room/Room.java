package domain.room;

import domain.game.Game;
import domain.game.GameFactory;
import domain.game.GameId;
import domain.game.GameStatus;
import domain.music.MusicPlayerType;
import domain.player.Player;
import domain.player.PlayerColor;
import domain.player.PlayerFactory;
import domain.player.PlayerId;
import domain.music.Playlist;
import domain.music.PlaylistId;
import domain.room.exception.PlayerAlreadyInRoomException;

import java.util.List;

public class Room {
    private final GameId id;
    private GameStatus gameStatus;
    private MusicPlayerType musicPlayerType;
    private final List<Player> players;
    private final List<Playlist> playlists;
    private final GameFactory gameFactory;
    private final PlayerFactory playerFactory;
    private final RoomValidator validator;

    public Room(GameId id, GameStatus gameStatus, MusicPlayerType musicPlayerType, List<Player> players,
                List<Playlist> playlists, GameFactory gameFactory, PlayerFactory playerFactory, RoomValidator validator) {
        this.id = id;
        this.gameStatus = gameStatus;
        this.musicPlayerType = musicPlayerType;
        this.players = players;
        this.playlists = playlists;
        this.gameFactory = gameFactory;
        this.playerFactory = playerFactory;
        this.validator = validator;
    }

    public GameId getId() {
        return id;
    }

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public MusicPlayerType getMusicPlayerType() {
        return musicPlayerType;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    public void addPlayer(PlayerId playerId) {
        for (Player player : players) {
            if (player.getId().equals(playerId)) {
                return;
            }
        }
        Player player = playerFactory.create(playerId, players);
        players.add(player);
    }

    public void removePlayer(PlayerId playerToRemoveId) {
        validator.validateCanRemovePlayer(playerToRemoveId, players);
        if (gameStatus.equals(GameStatus.LOBBY)) {
            players.removeIf(player -> player.getId().equals(playerToRemoveId));
        } else {
            players.stream()
                    .filter(player -> player.getId().equals(playerToRemoveId))
                    .findFirst()
                    .ifPresent(player -> player.setPlaying(false));
        }
    }

    public void kickPlayer(PlayerId playerId, PlayerId playerToRemoveId) {
        validator.validateCanKickPlayer(playerId, playerToRemoveId, players);
        removePlayer(playerToRemoveId);
    }

    public void changeMusicPlayerType(PlayerId playerId, MusicPlayerType musicPlayerType) {
        validator.validatePlayerCanChangeAuthType(playerId, players, gameStatus);
        this.musicPlayerType = musicPlayerType;
        playlists.clear();
    }

    public void changePlayerName(PlayerId playerId, String newName) {
        Player player = validator.validatePlayerCanChangeName(playerId, newName, players, gameStatus);
        player.setPlayerName(newName);
    }

    public void changePlayerColor(PlayerId playerId, PlayerColor newColor) {
        Player player = validator.validatePlayerCanChangeColor(playerId, newColor, players, gameStatus);
        player.setPlayerColor(newColor);
    }

    public void addPlaylist(PlayerId playerId, Playlist playlist) {
        validator.validatePlaylistCanBeAdded(playerId, playlist.id(), players, playlists, gameStatus);
        playlists.add(playlist);
    }

    public void removePlaylist(PlayerId playerId, PlaylistId playlistId) {
        validator.validatePlaylistCanBeRemoved(playerId, playlistId, players, playlists, gameStatus);
        playlists.removeIf(playlist -> playlist.id().equals(playlistId));
    }

    public Game startGame(PlayerId playerId) {
        validator.validatePlayerCanStartGame(playerId, players, playlists, gameStatus);
        gameStatus = GameStatus.PLAYING;
        return gameFactory.createGame(this);
    }
}