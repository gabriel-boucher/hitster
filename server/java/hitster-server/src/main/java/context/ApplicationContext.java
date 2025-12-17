package context;

import application.RoomAppService;
import application.GameAppService;
import application.SpotifyAppService;
import domain.game.CardRepository;
import domain.game.GameFactory;
import domain.game.GameRepository;
import domain.game.player.PlayerFactory;
import domain.room.RoomFactory;
import domain.room.RoomRepository;
import domain.spotify.PlaylistRepository;
import infrastructure.InMemoryCardRepository;
import infrastructure.InMemoryGameRepository;
import infrastructure.InMemoryPlaylistRepository;
import infrastructure.InMemoryRoomRepository;
import interfaces.mapper.*;
import interfaces.socket.game.mapper.*;
import interfaces.socket.room.RoomRessource;
import interfaces.socket.room.mapper.*;
import interfaces.socket.game.GameRessource;
import interfaces.rest.spotify.SpotifyResource;
import interfaces.mapper.PlaylistMapper;
import interfaces.rest.spotify.mapper.SearchPlaylistMapper;

public class ApplicationContext {
    private final RoomRessource roomRessource;
    private final GameRessource gameRessource;
    private final SpotifyResource spotifyResource;

    public ApplicationContext() {
        PlaylistMapper playlistMapper = new PlaylistMapper();
        SearchPlaylistMapper searchPlaylistMapper = new SearchPlaylistMapper(playlistMapper);

        CreateRoomMapper createRoomMapper = new CreateRoomMapper();
        JoinRoomMapper joinRoomMapper = new JoinRoomMapper();
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

        RoomAppService roomAppService = new RoomAppService(roomRepository, gameRepository, cardRepository, roomFactory, playerFactory);
        GameAppService gameAppService = new GameAppService(gameRepository, roomRepository, cardRepository, gameFactory);
        SpotifyAppService spotifyAppService = new SpotifyAppService(roomRepository, playlistRepository);

        // Create Socket.IO room resource
        roomRessource = new RoomRessource(roomAppService, createRoomMapper, joinRoomMapper, addPlaylistMapper, removePlaylistMapper, roomStateMapper);
        gameRessource = new GameRessource(gameAppService, startGameMapper, nextTurnMapper, addCurrentCardMapper, removeCurrentCardMapper, reorderCurrentCardMapper, addTokenMapper, removeTokenMapper, gameStateMapper);
        spotifyResource = new SpotifyResource(spotifyAppService, searchPlaylistMapper);
    }

    public RoomRessource getRoomRessource() {
        return roomRessource;
    }

    public GameRessource getGameRessource() {
        return gameRessource;
    }

    public SpotifyResource getSpotifyResource() {
        return spotifyResource;
    }
}
