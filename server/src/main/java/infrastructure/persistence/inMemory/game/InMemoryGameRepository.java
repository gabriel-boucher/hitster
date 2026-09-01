package infrastructure.persistence.inMemory.game;

import domain.game.Game;
import domain.game.GameId;
import domain.game.GameRepository;
import infrastructure.persistence.dao.*;
import infrastructure.persistence.dto.*;
import infrastructure.persistence.mapper.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class InMemoryGameRepository implements GameRepository {
    private final GameDao gameDao;
    private final GameStatusDao gameStatusDao;
    private final PlayerDao playerDao;
    private final CardDao cardDao;
    private final TokenDao tokenDao;
    private final CurrentItemsDao currentItemsDao;
    private final GamePersistenceMapper gamePersistenceMapper;
    private final PlayerPersistenceMapper playerPersistenceMapper;
    private final CardPersistenceMapper cardPersistenceMapper;
    private final CurrentItemPersistenceMapper currentItemPersistenceMapper;

    public InMemoryGameRepository(GameDao gameDao, GameStatusDao gameStatusDao, PlayerDao playerDao, CardDao cardDao, TokenDao tokenDao, CurrentItemsDao currentItemsDao,
                                  GamePersistenceMapper gamePersistenceMapper, PlayerPersistenceMapper playerPersistenceMapper, CardPersistenceMapper cardPersistenceMapper, CurrentItemPersistenceMapper currentItemPersistenceMapper) {
        this.gameDao = gameDao;
        this.gameStatusDao = gameStatusDao;
        this.playerDao = playerDao;
        this.cardDao = cardDao;
        this.tokenDao = tokenDao;
        this.currentItemsDao = currentItemsDao;
        this.gamePersistenceMapper = gamePersistenceMapper;
        this.playerPersistenceMapper = playerPersistenceMapper;
        this.cardPersistenceMapper = cardPersistenceMapper;
        this.currentItemPersistenceMapper = currentItemPersistenceMapper;
    }

    @Override
    public Optional<Game> getGameById(GameId gameId) {
        Optional<GamePersistenceDto> gamePersistenceDto = gameDao.getGameById(gameId.toString());
        Optional<String> gameStatusPersistenceDto = gameStatusDao.getGameStatusByGameId(gameId.toString());
        List<PlayerPersistenceDto> playerPersistenceDtos = playerDao.getPlayersByGameId(gameId.toString());
        List<CardPersistenceDto> stackPersistenceDtos = cardDao.getStackCardsByGameId(gameId.toString());

        return gamePersistenceDto.flatMap(game ->
                gameStatusPersistenceDto.map(gameStatus ->
                        gamePersistenceMapper.toDomain(
                                game,
                                gameStatus,
                                playerPersistenceDtos,
                                currentItemsDao.getCurrentDeckByGameId(game.id(), game.currentPlayerId(), game.currentCardId()),
                                stackPersistenceDtos
                        )
                )
        );
    }

    @Override
    public void saveGame(Game game) {
        GamePersistenceDto gamePersistenceDto = gamePersistenceMapper.toDto(game);
        gameDao.saveGame(gamePersistenceDto);

        String gameStatus = game.getStatus().toString();
        gameStatusDao.saveByGameId(game.getId().toString(), gameStatus);

        List<PlayerPersistenceDto> playerPersistenceDtos = game.getPlayers().stream()
                .map(playerPersistenceMapper::toDto)
                .collect(Collectors.toList());
        playerDao.saveByGameId(game.getId().toString(), playerPersistenceDtos);

        List<CardPersistenceDto> stackPersistenceDtos = game.getStack().getCards().stream()
                .map(cardPersistenceMapper::toDto)
                .collect(Collectors.toList());
        cardDao.saveStackCardsByGameId(game.getId().toString(), stackPersistenceDtos);

        List<ItemPersistenceDto> currentItemsDtos = game.getCurrentDeck().getCurrentItems().stream()
                .map(currentItemPersistenceMapper::toDto)
                .collect(Collectors.toList());
        currentItemsDao.saveCurrentDeckByGameId(game.getId().toString(), game.getCurrentCard().getId().toString(), currentItemsDtos);
    }

    @Override
    public void deleteGame(GameId gameId) {
        gameDao.deleteGame(gameId.toString());
        gameStatusDao.deleteByGameId(gameId.toString());
        playerDao.deleteByGameId(gameId.toString());
        cardDao.deleteByGameId(gameId.toString());
        tokenDao.deleteByGameId(gameId.toString());
        currentItemsDao.deleteByGameId(gameId.toString());
    }
}
