package context;

import application.RoomAppService;
import application.GameAppService;
import application.SpotifyAppService;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.game.CardRepository;
import domain.game.GameFactory;
import domain.game.GameRepository;
import domain.player.PlayerFactory;
import domain.room.RoomFactory;
import domain.room.RoomRepository;
import domain.spotify.accessToken.AccessTokenRepository;
import domain.spotify.PlaylistRepository;
import infrastructure.*;
import infrastructure.accessToken.mapper.AccessTokenSpotifyMapper;
import infrastructure.accessToken.repository.SpotifyApiAccessTokenRepository;
import infrastructure.playlist.mapper.SearchPlaylistsSpotifyMapper;
import infrastructure.playlist.repository.SpotifyApiPlaylistRepository;
import interfaces.mapper.*;
import interfaces.socket.connection.ConnectionResource;
import interfaces.socket.game.addCurrentCard.AddCurrentCardMapper;
import interfaces.socket.game.addToken.AddTokenMapper;
import interfaces.socket.game.nextTurn.NextTurnMapper;
import interfaces.socket.game.removeCurrentCard.RemoveCurrentCardMapper;
import interfaces.socket.game.removeToken.RemoveTokenMapper;
import interfaces.socket.game.reorderCurrentCard.ReorderCurrentCardMapper;
import interfaces.socket.room.addPlaylist.AddPlaylistHandler;
import interfaces.socket.room.changePlayerColor.ChangePlayerColorHandler;
import interfaces.socket.room.changePlayerName.ChangePlayerNameHandler;
import interfaces.socket.room.createRoom.CreateRoomHandler;
import interfaces.socket.room.joinRoom.JoinRoomHandler;
import interfaces.socket.room.removePlayer.RemovePlayerHandler;
import interfaces.socket.room.removePlaylist.RemovePlaylistHandler;
import interfaces.socket.room.startGame.StartGameHandler;
import interfaces.socket.room.startGame.StartGameMapper;
import interfaces.socket.room.RoomResource;
import interfaces.socket.room.addPlaylist.AddPlaylistMapper;
import interfaces.socket.room.changePlayerColor.ChangePlayerColorMapper;
import interfaces.socket.room.changePlayerName.ChangePlayerNameMapper;
import interfaces.socket.room.createRoom.CreateRoomMapper;
import interfaces.socket.room.joinRoom.JoinRoomMapper;
import interfaces.socket.room.removePlayer.RemovePlayerMapper;
import interfaces.socket.room.removePlaylist.RemovePlaylistMapper;
import interfaces.socket.game.GameResource;
import interfaces.rest.spotify.SpotifyResource;
import interfaces.mapper.PlaylistMapper;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistMapper;

public class ApplicationContext {
    private final ConnectionResource connectionResource;
    private final RoomResource roomResource;
    private final GameResource gameResource;
    private final SpotifyResource spotifyResource;

    public ApplicationContext() {
        ObjectMapper objectMapper = new ObjectMapper();

        // SpotifyResource mappers
        PlaylistMapper playlistMapper = new PlaylistMapper();
        SearchPlaylistMapper searchPlaylistMapper = new SearchPlaylistMapper(playlistMapper);

        // RoomResource mappers
        CreateRoomMapper createRoomMapper = new CreateRoomMapper();
        JoinRoomMapper joinRoomMapper = new JoinRoomMapper();
        ChangePlayerNameMapper changePlayerNameMapper = new ChangePlayerNameMapper();
        ChangePlayerColorMapper changePlayerColorMapper = new ChangePlayerColorMapper();
        RemovePlayerMapper removePlayerMapper = new RemovePlayerMapper();
        AddPlaylistMapper addPlaylistMapper = new AddPlaylistMapper(playlistMapper);
        RemovePlaylistMapper removePlaylistMapper = new RemovePlaylistMapper();
        StartGameMapper startGameMapper = new StartGameMapper();

        // GameResource mappers
        NextTurnMapper nextTurnMapper = new NextTurnMapper();
        AddCurrentCardMapper addCurrentCardMapper = new AddCurrentCardMapper();
        RemoveCurrentCardMapper removeCurrentCardMapper = new RemoveCurrentCardMapper();
        ReorderCurrentCardMapper reorderCurrentCardMapper = new ReorderCurrentCardMapper();
        AddTokenMapper addTokenMapper = new AddTokenMapper();
        RemoveTokenMapper removeTokenMapper = new RemoveTokenMapper();

        // State mappers
        CardMapper cardMapper = new CardMapper();
        TokenMapper tokenMapper = new TokenMapper();
        MoveableMapper moveableMapper = new MoveableMapper(cardMapper, tokenMapper);
        CurrentDeckMapper currentDeckMapper = new CurrentDeckMapper(moveableMapper);
        PlayerDeckMapper playerDeckMapper = new PlayerDeckMapper(cardMapper, tokenMapper);
        PlayerMapper playerMapper = new PlayerMapper(playerDeckMapper);

        RoomStateMapper roomStateMapper = new RoomStateMapper(playerMapper, playlistMapper);
        GameStateMapper gameStateMapper = new GameStateMapper(playerMapper, currentDeckMapper, cardMapper);

        // SpotifyRepository mappers
        AccessTokenSpotifyMapper accessTokenSpotifyMapper = new AccessTokenSpotifyMapper();
        SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper = new SearchPlaylistsSpotifyMapper();

        GameRepository gameRepository = new InMemoryGameRepository();
        RoomRepository roomRepository = new InMemoryRoomRepository();
        AccessTokenRepository accessTokenRepository = new SpotifyApiAccessTokenRepository(accessTokenSpotifyMapper, objectMapper);
        CardRepository cardRepository = new InMemoryCardRepository();
        PlaylistRepository playlistRepository = new SpotifyApiPlaylistRepository(searchPlaylistsSpotifyMapper, objectMapper);

        GameFactory gameFactory = new GameFactory();
        RoomFactory roomFactory = new RoomFactory();
        PlayerFactory playerFactory = new PlayerFactory();

        RoomAppService roomAppService = new RoomAppService(roomRepository, gameRepository, accessTokenRepository, cardRepository, roomFactory, gameFactory, playerFactory);
        GameAppService gameAppService = new GameAppService(gameRepository);
        SpotifyAppService spotifyAppService = new SpotifyAppService(roomRepository, playlistRepository);

        CreateRoomHandler createRoomHandler = new CreateRoomHandler(roomAppService, roomStateMapper, gameStateMapper, createRoomMapper);
        JoinRoomHandler joinRoomHandler = new JoinRoomHandler(roomAppService, roomStateMapper, gameStateMapper, joinRoomMapper);
        ChangePlayerNameHandler changePlayerNameHandler = new ChangePlayerNameHandler(roomAppService, roomStateMapper, gameStateMapper, changePlayerNameMapper);
        ChangePlayerColorHandler changePlayerColorHandler = new ChangePlayerColorHandler(roomAppService, roomStateMapper, gameStateMapper, changePlayerColorMapper);
        RemovePlayerHandler removePlayerHandler = new RemovePlayerHandler(roomAppService, roomStateMapper, gameStateMapper, removePlayerMapper);
        AddPlaylistHandler addPlaylistHandler = new AddPlaylistHandler(roomAppService, roomStateMapper, gameStateMapper, addPlaylistMapper);
        RemovePlaylistHandler removePlaylistHandler = new RemovePlaylistHandler(roomAppService, roomStateMapper, gameStateMapper, removePlaylistMapper);
        StartGameHandler startGameHandler = new StartGameHandler(roomAppService, roomStateMapper, gameStateMapper, startGameMapper);

        connectionResource = new ConnectionResource();
        roomResource = new RoomResource(createRoomHandler, joinRoomHandler, changePlayerNameHandler, changePlayerColorHandler, removePlayerHandler, addPlaylistHandler, removePlaylistHandler, startGameHandler);
        gameResource = new GameResource(gameAppService, nextTurnMapper, addCurrentCardMapper, removeCurrentCardMapper, reorderCurrentCardMapper, addTokenMapper, removeTokenMapper, gameStateMapper);
        spotifyResource = new SpotifyResource(spotifyAppService, searchPlaylistMapper);
    }

    public ConnectionResource getConnectionResource() {
        return connectionResource;
    }

    public RoomResource getRoomRessource() {
        return roomResource;
    }

    public GameResource getGameRessource() {
        return gameResource;
    }

    public SpotifyResource getSpotifyResource() {
        return spotifyResource;
    }
}
