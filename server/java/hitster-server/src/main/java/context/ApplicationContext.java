package context;

import application.RoomAppService;
import application.GameAppService;
import application.SpotifyAppService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import infrastructure.playlist.mapper.getPlaylistItems.GetPlaylistItemsSpotifyMapper;
import infrastructure.playlist.mapper.searchPlaylists.SearchPlaylistsSpotifyMapper;
import infrastructure.playlist.repository.SpotifyApiPlaylistRepository;
import interfaces.mapper.*;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.connection.ConnectionResource;
import interfaces.socket.game.addCurrentCard.AddCurrentCardHandler;
import interfaces.socket.game.addCurrentCard.AddCurrentCardMapper;
import interfaces.socket.game.addToken.AddTokenHandler;
import interfaces.socket.game.addToken.AddTokenMapper;
import interfaces.socket.game.nextTurn.NextTurnHandler;
import interfaces.socket.game.nextTurn.NextTurnMapper;
import interfaces.socket.game.removeCurrentCard.RemoveCurrentCardHandler;
import interfaces.socket.game.removeCurrentCard.RemoveCurrentCardMapper;
import interfaces.socket.game.removeToken.RemoveTokenHandler;
import interfaces.socket.game.removeToken.RemoveTokenMapper;
import interfaces.socket.game.moveCurrentCard.MoveCurrentCardHandler;
import interfaces.socket.game.moveCurrentCard.MoveCurrentCardMapper;
import interfaces.socket.game.returnCurrentCard.ReturnCurrentCardHandler;
import interfaces.socket.game.returnCurrentCard.ReturnCurrentCardMapper;
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
        AccessTokenSpotifyMapper accessTokenSpotifyMapper = new AccessTokenSpotifyMapper();
        SearchPlaylistsSpotifyMapper searchPlaylistsSpotifyMapper = new SearchPlaylistsSpotifyMapper();
        GetPlaylistItemsSpotifyMapper getPlaylistItemsSpotifyMapper = new GetPlaylistItemsSpotifyMapper();

        GameRepository gameRepository = new InMemoryGameRepository();
        RoomRepository roomRepository = new InMemoryRoomRepository();
        AccessTokenRepository accessTokenRepository = new SpotifyApiAccessTokenRepository(accessTokenSpotifyMapper, objectMapper);
        PlaylistRepository playlistRepository = new SpotifyApiPlaylistRepository(searchPlaylistsSpotifyMapper, getPlaylistItemsSpotifyMapper, objectMapper);

        GameFactory gameFactory = new GameFactory();
        RoomFactory roomFactory = new RoomFactory();
        PlayerFactory playerFactory = new PlayerFactory();

        RoomAppService roomAppService = new RoomAppService(roomRepository, gameRepository, accessTokenRepository, playlistRepository, roomFactory, gameFactory, playerFactory);
        GameAppService gameAppService = new GameAppService(gameRepository);
        SpotifyAppService spotifyAppService = new SpotifyAppService(roomRepository, playlistRepository);

        SocketEventBroadcaster socketEventBroadcaster = new SocketEventBroadcaster(roomStateMapper, gameStateMapper);

        CreateRoomHandler createRoomHandler = new CreateRoomHandler(roomAppService, createRoomMapper);
        JoinRoomHandler joinRoomHandler = new JoinRoomHandler(roomAppService, joinRoomMapper, socketEventBroadcaster);
        ChangePlayerNameHandler changePlayerNameHandler = new ChangePlayerNameHandler(roomAppService, changePlayerNameMapper, socketEventBroadcaster);
        ChangePlayerColorHandler changePlayerColorHandler = new ChangePlayerColorHandler(roomAppService, changePlayerColorMapper, socketEventBroadcaster);
        RemovePlayerHandler removePlayerHandler = new RemovePlayerHandler(roomAppService, removePlayerMapper, socketEventBroadcaster);
        AddPlaylistHandler addPlaylistHandler = new AddPlaylistHandler(roomAppService, addPlaylistMapper, socketEventBroadcaster);
        RemovePlaylistHandler removePlaylistHandler = new RemovePlaylistHandler(roomAppService, removePlaylistMapper, socketEventBroadcaster);
        StartGameHandler startGameHandler = new StartGameHandler(roomAppService, startGameMapper, socketEventBroadcaster);

        NextTurnHandler nextTurnHandler = new NextTurnHandler(gameAppService, nextTurnMapper, socketEventBroadcaster);
        AddCurrentCardHandler addCurrentCardHandler = new AddCurrentCardHandler(gameAppService, addCurrentCardMapper, socketEventBroadcaster);
        RemoveCurrentCardHandler removeCurrentCardHandler = new RemoveCurrentCardHandler(gameAppService, removeCurrentCardMapper, socketEventBroadcaster);
        ReturnCurrentCardHandler returnCurrentCardHandler = new ReturnCurrentCardHandler(gameAppService, returnCurrentCardMapper, socketEventBroadcaster);
        MoveCurrentCardHandler moveCurrentCardHandler = new MoveCurrentCardHandler(gameAppService, moveCurrentCardMapper, socketEventBroadcaster);
        AddTokenHandler addTokenHandler = new AddTokenHandler(gameAppService, addTokenMapper, socketEventBroadcaster);
        RemoveTokenHandler removeTokenHandler = new RemoveTokenHandler(gameAppService, removeTokenMapper, socketEventBroadcaster);

        connectionResource = new ConnectionResource();
        roomResource = new RoomResource(createRoomHandler, joinRoomHandler, changePlayerNameHandler, changePlayerColorHandler, removePlayerHandler, addPlaylistHandler, removePlaylistHandler, startGameHandler);
        gameResource = new GameResource(nextTurnHandler, addCurrentCardHandler, removeCurrentCardHandler, returnCurrentCardHandler, moveCurrentCardHandler, addTokenHandler, removeTokenHandler);
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
