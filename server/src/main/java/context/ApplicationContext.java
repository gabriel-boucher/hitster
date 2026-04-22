package context;

import application.AuthAppService;
import application.RoomAppService;
import application.GameAppService;
import application.MusicAppService;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.game.GameFactory;
import domain.game.GameRepository;
import domain.game.GameValidator;
import domain.music.MusicPlayerValidator;
import domain.music.PlaylistValidator;
import domain.player.PlayerFactory;
import domain.player.PlayerValidator;
import domain.room.RoomFactory;
import domain.room.RoomRepository;
import domain.room.RoomValidator;
import infrastructure.game.InMemoryGameRepository;
import infrastructure.music.MusicRepositoryFactory;
import infrastructure.music.repository.InMemoryMusicRepository;
import infrastructure.musicAuth.spotify.auth.SpotifyAccessTokenMapper;
import infrastructure.musicAuth.spotify.auth.SpotifyAuthRepository;
import infrastructure.music.mapper.getPlaylistItems.GetPlaylistItemsSpotifyMapper;
import infrastructure.music.mapper.searchPlaylists.SearchPlaylistsSpotifyMapper;
import infrastructure.music.repository.SpotifyMusicRepository;
import infrastructure.musicAuth.spotify.apiToken.InMemorySpotifyAccessTokenRepository;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenRepository;
import infrastructure.room.InMemoryRoomRepository;
import interfaces.mapper.*;
import interfaces.http.auth.AuthResource;
import interfaces.http.auth.inMemoryAuth.AuthInMemoryHandler;
import interfaces.http.auth.spotifyAuth.AuthSpotifyHandler;
import interfaces.http.music.MusicResource;
import interfaces.http.auth.inMemoryAuth.AuthInMemoryMapper;
import interfaces.http.auth.spotifyAuth.AuthSpotifyMapper;
import interfaces.http.music.searchPlaylists.SearchPlaylistsHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.socket.connection.ConnectionResource;
import interfaces.http.game.addCurrentCard.AddCurrentCardHandler;
import interfaces.http.game.addCurrentCard.AddCurrentCardMapper;
import interfaces.http.game.addToken.AddTokenHandler;
import interfaces.http.game.addToken.AddTokenMapper;
import interfaces.http.game.nextTurn.NextTurnHandler;
import interfaces.http.game.nextTurn.NextTurnMapper;
import interfaces.http.game.removeCurrentCard.RemoveCurrentCardHandler;
import interfaces.http.game.removeCurrentCard.RemoveCurrentCardMapper;
import interfaces.http.game.removeToken.RemoveTokenHandler;
import interfaces.http.game.removeToken.RemoveTokenMapper;
import interfaces.http.game.moveCurrentCard.MoveCurrentCardHandler;
import interfaces.http.game.moveCurrentCard.MoveCurrentCardMapper;
import interfaces.http.game.returnCurrentCard.ReturnCurrentCardHandler;
import interfaces.http.game.returnCurrentCard.ReturnCurrentCardMapper;
import interfaces.http.music.addPlaylist.AddPlaylistHandler;
import interfaces.http.room.changePlayerColor.ChangePlayerColorHandler;
import interfaces.http.room.changePlayerName.ChangePlayerNameHandler;
import interfaces.http.room.createRoom.CreateRoomHandler;
import interfaces.http.room.joinRoom.JoinRoomHandler;
import interfaces.http.room.removePlayer.RemovePlayerHandler;
import interfaces.http.music.removePlaylist.RemovePlaylistHandler;
import interfaces.http.room.startGame.StartGameHandler;
import interfaces.http.room.startGame.StartGameMapper;
import interfaces.http.room.RoomResource;
import interfaces.http.music.addPlaylist.AddPlaylistMapper;
import interfaces.http.room.changePlayerColor.ChangePlayerColorMapper;
import interfaces.http.room.changePlayerName.ChangePlayerNameMapper;
import interfaces.http.room.joinRoom.JoinRoomMapper;
import interfaces.http.room.removePlayer.RemovePlayerMapper;
import interfaces.http.music.removePlaylist.RemovePlaylistMapper;
import interfaces.http.game.GameResource;
import interfaces.mapper.PlaylistMapper;
import interfaces.http.music.searchPlaylists.SearchPlaylistsMapper;

public class ApplicationContext {
    private final ConnectionResource connectionResource;
    private final AuthResource authResource;
    private final RoomResource roomResource;
    private final GameResource gameResource;
    private final MusicResource musicResource;
    private final SocketIOServerHolder socketIOServerHolder;

    public ApplicationContext() {
        ObjectMapper objectMapper = new ObjectMapper();

        // MusicResource mappers
        PlaylistMapper playlistMapper = new PlaylistMapper();
        AuthInMemoryMapper authInMemoryMapper = new AuthInMemoryMapper();
        AuthSpotifyMapper authSpotifyMapper = new AuthSpotifyMapper();
        SearchPlaylistsMapper searchPlaylistsMapper = new SearchPlaylistsMapper(playlistMapper);

        // RoomResource mappers
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
        ReturnCurrentCardMapper returnCurrentCardMapper = new ReturnCurrentCardMapper();
        MoveCurrentCardMapper moveCurrentCardMapper = new MoveCurrentCardMapper();
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
        GameStateMapper gameStateMapper = new GameStateMapper(playerMapper, currentDeckMapper);

        // SpotifyRepository mappers
        SpotifyAccessTokenMapper spotifyAccessTokenMapper = new SpotifyAccessTokenMapper();
        SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper = new SearchPlaylistsSpotifyMapper();
        GetPlaylistItemsSpotifyMapper getPlaylistItemsSpotifyMapper = new GetPlaylistItemsSpotifyMapper();

        // Repositories
        GameRepository gameRepository = new InMemoryGameRepository();
        RoomRepository roomRepository = new InMemoryRoomRepository();
        SpotifyAccessTokenRepository spotifyAccessTokenRepository = new InMemorySpotifyAccessTokenRepository();
        SpotifyAuthRepository spotifyAuthRepository = new SpotifyAuthRepository(spotifyAccessTokenRepository, spotifyAccessTokenMapper, objectMapper);

        // Validators
        PlayerValidator playerValidator = new PlayerValidator();
        PlaylistValidator playlistValidator = new PlaylistValidator();
        GameValidator gameValidator = new GameValidator();
        RoomValidator roomValidator = new RoomValidator(playerValidator, playlistValidator, gameValidator);
        MusicPlayerValidator musicPlayerValidator = new MusicPlayerValidator(playerValidator);

        // Factories
        GameFactory gameFactory = new GameFactory();
        RoomFactory roomFactory = new RoomFactory();
        PlayerFactory playerFactory = new PlayerFactory();

        InMemoryMusicRepository inMemoryMusicRepository = new InMemoryMusicRepository();
        SpotifyMusicRepository spotifyMusicRepository = new SpotifyMusicRepository(spotifyAccessTokenRepository, searchPlaylistsSpotifyMapper, getPlaylistItemsSpotifyMapper, objectMapper);
        MusicRepositoryFactory musicRepositoryFactory = new MusicRepositoryFactory(inMemoryMusicRepository, spotifyMusicRepository);

        // AppServices
        AuthAppService authAppService = new AuthAppService(roomRepository, spotifyAuthRepository);
        RoomAppService roomAppService = new RoomAppService(roomRepository, gameRepository, roomFactory, gameFactory, playerFactory, musicRepositoryFactory, roomValidator);
        GameAppService gameAppService = new GameAppService(gameRepository);
        MusicAppService musicAppService = new MusicAppService(roomRepository, musicRepositoryFactory, musicPlayerValidator);

        SocketEventBroadcaster socketEventBroadcaster = new SocketEventBroadcaster(roomStateMapper, gameStateMapper);
        socketIOServerHolder = new SocketIOServerHolder();

        AuthInMemoryHandler authInMemoryHandler = new AuthInMemoryHandler(authAppService, authInMemoryMapper, socketEventBroadcaster, socketIOServerHolder);
        AuthSpotifyHandler authSpotifyHandler = new AuthSpotifyHandler(authAppService, authSpotifyMapper, socketEventBroadcaster, socketIOServerHolder);

        SearchPlaylistsHandler searchPlaylistsHandler = new SearchPlaylistsHandler(musicAppService, searchPlaylistsMapper);

        CreateRoomHandler createRoomHandler = new CreateRoomHandler(roomAppService);
        JoinRoomHandler joinRoomHandler = new JoinRoomHandler(roomAppService, joinRoomMapper, socketEventBroadcaster, socketIOServerHolder);
        ChangePlayerNameHandler changePlayerNameHandler = new ChangePlayerNameHandler(roomAppService, changePlayerNameMapper, socketEventBroadcaster, socketIOServerHolder);
        ChangePlayerColorHandler changePlayerColorHandler = new ChangePlayerColorHandler(roomAppService, changePlayerColorMapper, socketEventBroadcaster, socketIOServerHolder);
        RemovePlayerHandler removePlayerHandler = new RemovePlayerHandler(roomAppService, removePlayerMapper, socketEventBroadcaster, socketIOServerHolder);
        AddPlaylistHandler addPlaylistHandler = new AddPlaylistHandler(roomAppService, addPlaylistMapper, socketEventBroadcaster, socketIOServerHolder);
        RemovePlaylistHandler removePlaylistHandler = new RemovePlaylistHandler(roomAppService, removePlaylistMapper, socketEventBroadcaster, socketIOServerHolder);
        StartGameHandler startGameHandler = new StartGameHandler(roomAppService, startGameMapper, socketEventBroadcaster, socketIOServerHolder);

        NextTurnHandler nextTurnHandler = new NextTurnHandler(gameAppService, nextTurnMapper, socketEventBroadcaster, socketIOServerHolder);
        AddCurrentCardHandler addCurrentCardHandler = new AddCurrentCardHandler(gameAppService, addCurrentCardMapper, socketEventBroadcaster, socketIOServerHolder);
        RemoveCurrentCardHandler removeCurrentCardHandler = new RemoveCurrentCardHandler(gameAppService, removeCurrentCardMapper, socketEventBroadcaster, socketIOServerHolder);
        ReturnCurrentCardHandler returnCurrentCardHandler = new ReturnCurrentCardHandler(gameAppService, returnCurrentCardMapper, socketEventBroadcaster, socketIOServerHolder);
        MoveCurrentCardHandler moveCurrentCardHandler = new MoveCurrentCardHandler(gameAppService, moveCurrentCardMapper, socketEventBroadcaster, socketIOServerHolder);
        AddTokenHandler addTokenHandler = new AddTokenHandler(gameAppService, addTokenMapper, socketEventBroadcaster, socketIOServerHolder);
        RemoveTokenHandler removeTokenHandler = new RemoveTokenHandler(gameAppService, removeTokenMapper, socketEventBroadcaster, socketIOServerHolder);

        connectionResource = new ConnectionResource();
        authResource = new AuthResource(authInMemoryHandler, authSpotifyHandler);
        roomResource = new RoomResource(createRoomHandler, joinRoomHandler, changePlayerNameHandler, changePlayerColorHandler, removePlayerHandler, startGameHandler);
        gameResource = new GameResource(nextTurnHandler, addCurrentCardHandler, removeCurrentCardHandler, returnCurrentCardHandler, moveCurrentCardHandler, addTokenHandler, removeTokenHandler);
        musicResource = new MusicResource(searchPlaylistsHandler, addPlaylistHandler, removePlaylistHandler);
    }

    public ConnectionResource getConnectionResource() {
        return connectionResource;
    }

    public AuthResource getAuthResource() {
        return authResource;
    }

    public RoomResource getRoomRessource() {
        return roomResource;
    }

    public GameResource getGameRessource() {
        return gameResource;
    }

    public MusicResource getSpotifyResource() {
        return musicResource;
    }

    public SocketIOServerHolder getSocketIOServerHolder() {
        return socketIOServerHolder;
    }
}

