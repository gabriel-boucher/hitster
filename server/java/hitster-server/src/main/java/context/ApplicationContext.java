package context;

import application.RoomAppService;
import application.GameAppService;
import application.SpotifyAppService;
import domain.game.CardRepository;
import domain.game.GameFactory;
import domain.game.GameRepository;
import domain.player.PlayerFactory;
import domain.room.RoomFactory;
import domain.room.RoomRepository;
import domain.spotify.PlaylistRepository;
import infrastructure.InMemoryCardRepository;
import infrastructure.InMemoryGameRepository;
import infrastructure.InMemoryPlaylistRepository;
import infrastructure.InMemoryRoomRepository;
import interfaces.mapper.*;
import interfaces.socket.connection.ConnectionResource;
import interfaces.socket.game.mapper.*;
import interfaces.socket.room.RoomResource;
import interfaces.socket.room.mapper.*;
import interfaces.socket.game.GameResource;
import interfaces.rest.spotify.SpotifyResource;
import interfaces.mapper.PlaylistMapper;
import interfaces.rest.spotify.mapper.SearchPlaylistMapper;

public class ApplicationContext {
    private final ConnectionResource connectionResource;
    private final RoomResource roomResource;
    private final GameResource gameResource;
    private final SpotifyResource spotifyResource;

    public ApplicationContext() {
        PlaylistMapper playlistMapper = new PlaylistMapper();
        SearchPlaylistMapper searchPlaylistMapper = new SearchPlaylistMapper(playlistMapper);

        JoinRoomMapper joinRoomMapper = new JoinRoomMapper();
        ChangePlayerNameMapper changePlayerNameMapper = new ChangePlayerNameMapper();
        ChangePlayerColorMapper changePlayerColorMapper = new ChangePlayerColorMapper();
        RemovePlayerMapper removePlayerMapper = new RemovePlayerMapper();
        AddPlaylistMapper addPlaylistMapper = new AddPlaylistMapper(playlistMapper);
        RemovePlaylistMapper removePlaylistMapper = new RemovePlaylistMapper();

        StartGameMapper startGameMapper = new StartGameMapper();
        NextTurnMapper nextTurnMapper = new NextTurnMapper();
        AddCurrentCardMapper addCurrentCardMapper = new AddCurrentCardMapper();
        RemoveCurrentCardMapper removeCurrentCardMapper = new RemoveCurrentCardMapper();
        ReorderCurrentCardMapper reorderCurrentCardMapper = new ReorderCurrentCardMapper();
        AddTokenMapper addTokenMapper = new AddTokenMapper();
        RemoveTokenMapper removeTokenMapper = new RemoveTokenMapper();

        CardMapper cardMapper = new CardMapper();
        TokenMapper tokenMapper = new TokenMapper();
        MoveableMapper moveableMapper = new MoveableMapper(cardMapper, tokenMapper);
        CurrentDeckMapper currentDeckMapper = new CurrentDeckMapper(moveableMapper);
        PlayerDeckMapper playerDeckMapper = new PlayerDeckMapper(cardMapper, tokenMapper);
        PlayerMapper playerMapper = new PlayerMapper(playerDeckMapper);

        GameStateMapper gameStateMapper = new GameStateMapper(playerMapper, currentDeckMapper, cardMapper);
        RoomStateMapper roomStateMapper = new RoomStateMapper(playerMapper, playlistMapper);

        GameRepository gameRepository = new InMemoryGameRepository();
        RoomRepository roomRepository = new InMemoryRoomRepository();
        CardRepository cardRepository = new InMemoryCardRepository();
        PlaylistRepository playlistRepository = new InMemoryPlaylistRepository();

        GameFactory gameFactory = new GameFactory();
        RoomFactory roomFactory = new RoomFactory();
        PlayerFactory playerFactory = new PlayerFactory();

        RoomAppService roomAppService = new RoomAppService(roomRepository, gameRepository, cardRepository, roomFactory, gameFactory, playerFactory);
        GameAppService gameAppService = new GameAppService(gameRepository);
        SpotifyAppService spotifyAppService = new SpotifyAppService(roomRepository, playlistRepository);

        connectionResource = new ConnectionResource();
        roomResource = new RoomResource(roomAppService, joinRoomMapper, changePlayerNameMapper, changePlayerColorMapper, removePlayerMapper, addPlaylistMapper, removePlaylistMapper, startGameMapper, roomStateMapper, gameStateMapper);
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
