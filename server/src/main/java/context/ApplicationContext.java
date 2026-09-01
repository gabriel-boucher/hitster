package context;

import application.MusicAuthAppService;
import application.RoomAppService;
import application.GameAppService;
import application.MusicAppService;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.connection.ConnectionFactory;
import domain.connection.ConnectionRepository;
import domain.connection.ConnectionServer;
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
import infrastructure.persistence.dao.*;
import infrastructure.persistence.inMemory.connection.InMemoryConnectionRepository;
import infrastructure.persistence.inMemory.deck.dao.CardInMemoryDao;
import infrastructure.persistence.inMemory.deck.dao.CurrentItemsInMemoryDao;
import infrastructure.persistence.inMemory.deck.dao.TokenInMemoryDao;
import infrastructure.persistence.inMemory.game.InMemoryGameRepository;
import infrastructure.persistence.inMemory.game.dao.GameInMemoryDao;
import infrastructure.persistence.inMemory.game.dao.GameStatusInMemoryDao;
import infrastructure.external.music.MusicRepositoryFactory;
import infrastructure.external.music.seed.SeedMusicRepository;
import infrastructure.persistence.inMemory.musicAuth.spotify.auth.SpotifyAccessTokenMapper;
import infrastructure.persistence.inMemory.musicAuth.spotify.auth.SpotifyAuthRepository;
import infrastructure.external.music.spotify.mapper.getPlaylistItems.GetPlaylistItemsSpotifyMapper;
import infrastructure.external.music.spotify.mapper.searchPlaylists.SearchPlaylistsSpotifyMapper;
import infrastructure.external.music.spotify.SpotifyMusicRepository;
import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.InMemorySpotifyAccessTokenRepository;
import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessTokenRepository;
import infrastructure.persistence.inMemory.player.dao.PlayerInMemoryDao;
import infrastructure.persistence.inMemory.room.InMemoryRoomRepository;
import infrastructure.persistence.inMemory.room.dao.PlaylistInMemoryDao;
import infrastructure.persistence.inMemory.room.dao.RoomInMemoryDao;
import infrastructure.persistence.mapper.*;
import interfaces.http.deckMovement.DeckMovementResource;
import interfaces.http.deckMovement.cardMovement.CardMovementHandler;
import interfaces.http.deckMovement.tokenMovement.TokenMovementHandler;
import interfaces.http.music.MusicResource;
import interfaces.http.music.playlistProvider.PlaylistProviderHandler;
import interfaces.http.player.PlayerResource;
import interfaces.http.playlist.PlaylistResource;
import interfaces.http.room.connectRoom.ConnectRoomHandler;
import interfaces.http.room.connectRoom.ConnectRoomMapper;
import interfaces.http.room.createRoom.dto.CreateRoomMapper;
import interfaces.mapper.*;
import interfaces.http.music.playlistProvider.inMemoryAuth.AuthInMemoryHandler;
import interfaces.http.music.playlistProvider.spotifyAuth.AuthSpotifyHandler;
import interfaces.http.music.playlistProvider.inMemoryAuth.AuthInMemoryMapper;
import interfaces.http.music.playlistProvider.spotifyAuth.AuthSpotifyMapper;
import interfaces.http.music.searchPlaylists.SearchPlaylistsHandler;
import interfaces.socket.connection.ConnectionResource;
import interfaces.http.deckMovement.cardMovement.addCurrentCard.AddCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.addCurrentCard.AddCurrentCardMapper;
import interfaces.http.deckMovement.tokenMovement.addToken.AddTokenHandler;
import interfaces.http.deckMovement.tokenMovement.addToken.AddTokenMapper;
import interfaces.http.game.nextTurn.NextTurnHandler;
import interfaces.http.game.nextTurn.NextTurnMapper;
import interfaces.http.deckMovement.cardMovement.removeCurrentCard.RemoveCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.removeCurrentCard.RemoveCurrentCardMapper;
import interfaces.http.deckMovement.tokenMovement.removeToken.RemoveTokenHandler;
import interfaces.http.deckMovement.tokenMovement.removeToken.RemoveTokenMapper;
import interfaces.http.deckMovement.cardMovement.moveCurrentCard.MoveCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.moveCurrentCard.MoveCurrentCardMapper;
import interfaces.http.deckMovement.cardMovement.returnCurrentCard.ReturnCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.returnCurrentCard.ReturnCurrentCardMapper;
import interfaces.http.playlist.addPlaylist.AddPlaylistHandler;
import interfaces.http.player.changePlayerMe.ChangePlayerMeHandler;
import interfaces.http.room.createRoom.CreateRoomHandler;
import interfaces.http.room.joinRoom.JoinRoomHandler;
import interfaces.http.player.removePlayer.RemovePlayerHandler;
import interfaces.http.playlist.removePlaylist.RemovePlaylistHandler;
import interfaces.http.room.startGame.StartGameHandler;
import interfaces.http.room.startGame.StartGameMapper;
import interfaces.http.room.RoomResource;
import interfaces.http.playlist.addPlaylist.AddPlaylistMapper;
import interfaces.http.player.changePlayerMe.ChangePlayerMeMapper;
import interfaces.http.room.joinRoom.JoinRoomMapper;
import interfaces.http.player.removePlayer.RemovePlayerMapper;
import interfaces.http.playlist.removePlaylist.RemovePlaylistMapper;
import interfaces.http.game.GameResource;
import interfaces.mapper.PlaylistMapper;
import interfaces.http.music.searchPlaylists.SearchPlaylistsMapper;
import interfaces.socket.connection.disconnect.DisconnectHandler;
import interfaces.socket.connection.disconnect.DisconnectMapper;

import java.util.HashMap;

public class ApplicationContext {
    private final ConnectionResource connectionResource;
    private final RoomResource roomResource;
    private final GameResource gameResource;
    private final PlayerResource playerResource;
    private final PlaylistResource playlistResource;
    private final MusicResource musicResource;
    private final DeckMovementResource deckMovementResource;

    public ApplicationContext(ConnectionServer connectionServer) {
        ObjectMapper objectMapper = new ObjectMapper();

        // Connection mappers
        DisconnectMapper disconnectMapper = new DisconnectMapper();

        // PlaylistResource mappers
        PlaylistMapper playlistMapper = new PlaylistMapper();
        AuthInMemoryMapper authInMemoryMapper = new AuthInMemoryMapper();
        AuthSpotifyMapper authSpotifyMapper = new AuthSpotifyMapper();
        SearchPlaylistsMapper searchPlaylistsMapper = new SearchPlaylistsMapper(playlistMapper);

        // RoomResource mappers
        CreateRoomMapper createRoomMapper = new CreateRoomMapper();
        ConnectRoomMapper connectRoomMapper = new ConnectRoomMapper();
        JoinRoomMapper joinRoomMapper = new JoinRoomMapper();
        ChangePlayerMeMapper changePlayerMeMapper = new ChangePlayerMeMapper();
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

        // Persistence mappers
        CardPersistenceMapper cardPersistenceMapper = new CardPersistenceMapper();
        TokenPersistenceMapper tokenPersistenceMapper = new TokenPersistenceMapper();
        CurrentItemPersistenceMapper currentItemPersistenceMapper = new CurrentItemPersistenceMapper(cardPersistenceMapper, tokenPersistenceMapper);
        PlaylistPersistenceMapper playlistPersistenceMapper = new PlaylistPersistenceMapper();
        PlayerPersistenceMapper playerPersistenceMapper = new PlayerPersistenceMapper(cardPersistenceMapper, tokenPersistenceMapper);
        RoomPersistenceMapper roomPersistenceMapper = new RoomPersistenceMapper(playerPersistenceMapper, playlistPersistenceMapper);
        GamePersistenceMapper gamePersistenceMapper = new GamePersistenceMapper(playerPersistenceMapper, cardPersistenceMapper, currentItemPersistenceMapper);

        // Daos
        GameDao gameDao = new GameInMemoryDao(new HashMap<>());
        RoomDao roomDao = new RoomInMemoryDao(new HashMap<>());
        GameStatusDao gameStatusDao = new GameStatusInMemoryDao(new HashMap<>());
        PlaylistDao playlistDao = new PlaylistInMemoryDao(new HashMap<>());
        CardDao cardDao = new CardInMemoryDao(new HashMap<>());
        TokenDao tokenDao = new TokenInMemoryDao(new HashMap<>());
        CurrentItemsDao currentItemsDao = new CurrentItemsInMemoryDao(cardDao, tokenDao, new HashMap<>());
        PlayerDao playerDao = new PlayerInMemoryDao(new HashMap<>(), cardDao, tokenDao);

        // Repositories
        GameRepository gameRepository = new InMemoryGameRepository(gameDao, gameStatusDao, playerDao, cardDao, tokenDao, currentItemsDao, gamePersistenceMapper, playerPersistenceMapper, cardPersistenceMapper, currentItemPersistenceMapper);
        RoomRepository roomRepository = new InMemoryRoomRepository(roomDao, gameStatusDao, playerDao, playlistDao, roomPersistenceMapper, playerPersistenceMapper, playlistPersistenceMapper);
        ConnectionRepository connectionRepository = new InMemoryConnectionRepository();
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
        ConnectionFactory connectionFactory = new ConnectionFactory();
        PlayerFactory playerFactory = new PlayerFactory();

        SeedMusicRepository seedMusicRepository = new SeedMusicRepository();
        SpotifyMusicRepository spotifyMusicRepository = new SpotifyMusicRepository(spotifyAccessTokenRepository, searchPlaylistsSpotifyMapper, getPlaylistItemsSpotifyMapper, objectMapper);
        MusicRepositoryFactory musicRepositoryFactory = new MusicRepositoryFactory(seedMusicRepository, spotifyMusicRepository);

        // AppServices
        connectionServer.setup(roomStateMapper, gameStateMapper);

        MusicAuthAppService musicAuthAppService = new MusicAuthAppService(roomRepository, spotifyAuthRepository, connectionServer);
        RoomAppService roomAppService = new RoomAppService(roomRepository, gameRepository, connectionRepository, connectionServer, roomFactory, gameFactory, connectionFactory, playerFactory, musicRepositoryFactory, roomValidator);
        GameAppService gameAppService = new GameAppService(gameRepository, connectionServer);
        MusicAppService musicAppService = new MusicAppService(roomRepository, musicRepositoryFactory, musicPlayerValidator);


        DisconnectHandler disconnectHandler = new DisconnectHandler(roomAppService, disconnectMapper);

        AuthInMemoryHandler authInMemoryHandler = new AuthInMemoryHandler(musicAuthAppService, authInMemoryMapper);
        AuthSpotifyHandler authSpotifyHandler = new AuthSpotifyHandler(musicAuthAppService, authSpotifyMapper);
        SearchPlaylistsHandler searchPlaylistsHandler = new SearchPlaylistsHandler(musicAppService, searchPlaylistsMapper);
        PlaylistProviderHandler playlistProviderHandler = new PlaylistProviderHandler(authInMemoryHandler, authSpotifyHandler);

        CreateRoomHandler createRoomHandler = new CreateRoomHandler(roomAppService, createRoomMapper);
        ConnectRoomHandler connectRoomHandler = new ConnectRoomHandler(roomAppService, connectRoomMapper);
        JoinRoomHandler joinRoomHandler = new JoinRoomHandler(roomAppService, joinRoomMapper);
        StartGameHandler startGameHandler = new StartGameHandler(roomAppService, startGameMapper);

        ChangePlayerMeHandler changePlayerMeHandler = new ChangePlayerMeHandler(roomAppService, changePlayerMeMapper);
        RemovePlayerHandler removePlayerHandler = new RemovePlayerHandler(roomAppService, removePlayerMapper);

        AddPlaylistHandler addPlaylistHandler = new AddPlaylistHandler(roomAppService, addPlaylistMapper);
        RemovePlaylistHandler removePlaylistHandler = new RemovePlaylistHandler(roomAppService, removePlaylistMapper);

        NextTurnHandler nextTurnHandler = new NextTurnHandler(gameAppService, nextTurnMapper);

        AddCurrentCardHandler addCurrentCardHandler = new AddCurrentCardHandler(gameAppService, addCurrentCardMapper);
        RemoveCurrentCardHandler removeCurrentCardHandler = new RemoveCurrentCardHandler(gameAppService, removeCurrentCardMapper);
        ReturnCurrentCardHandler returnCurrentCardHandler = new ReturnCurrentCardHandler(gameAppService, returnCurrentCardMapper);
        MoveCurrentCardHandler moveCurrentCardHandler = new MoveCurrentCardHandler(gameAppService, moveCurrentCardMapper);
        AddTokenHandler addTokenHandler = new AddTokenHandler(gameAppService, addTokenMapper);
        RemoveTokenHandler removeTokenHandler = new RemoveTokenHandler(gameAppService, removeTokenMapper);
        CardMovementHandler cardMovementHandler = new CardMovementHandler(addCurrentCardHandler, moveCurrentCardHandler, removeCurrentCardHandler, returnCurrentCardHandler);
        TokenMovementHandler tokenMovementHandler = new TokenMovementHandler(addTokenHandler, removeTokenHandler);

        connectionResource = new ConnectionResource(disconnectHandler);
        roomResource = new RoomResource(createRoomHandler, connectRoomHandler, joinRoomHandler, startGameHandler);
        gameResource = new GameResource(nextTurnHandler);
        playerResource = new PlayerResource(changePlayerMeHandler, removePlayerHandler);
        playlistResource = new PlaylistResource(addPlaylistHandler, removePlaylistHandler);
        musicResource = new MusicResource(searchPlaylistsHandler, playlistProviderHandler);
        deckMovementResource = new DeckMovementResource(cardMovementHandler, tokenMovementHandler);
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

    public PlayerResource getPlayerResource() {
        return playerResource;
    }

    public PlaylistResource getPlaylistResource() {
        return playlistResource;
    }

    public MusicResource getMusicResource() {
        return  musicResource;
    }

    public DeckMovementResource getDeckMovementResource() {
        return deckMovementResource;
    }
}


