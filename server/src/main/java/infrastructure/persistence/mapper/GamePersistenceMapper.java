package infrastructure.persistence.mapper;

import domain.deck.currentDeck.CurrentDeck;
import domain.deck.item.Moveable;
import domain.game.*;
import domain.player.PlayerId;
import domain.player.Players;
import infrastructure.persistence.dto.*;

import java.util.List;
import java.util.stream.Collectors;

public class GamePersistenceMapper {
    private final PlayerPersistenceMapper playerPersistenceMapper;
    private final CardPersistenceMapper cardPersistenceMapper;
    private final CurrentItemPersistenceMapper currentItemPersistenceMapper;

    public GamePersistenceMapper(PlayerPersistenceMapper playerPersistenceMapper, CardPersistenceMapper cardPersistenceMapper, CurrentItemPersistenceMapper currentItemPersistenceMapper) {
        this.playerPersistenceMapper = playerPersistenceMapper;
        this.cardPersistenceMapper = cardPersistenceMapper;
        this.currentItemPersistenceMapper = currentItemPersistenceMapper;
    }

    public Game toDomain(GamePersistenceDto gamePersistenceDto, String gameStatusPersistenceDto, List<PlayerPersistenceDto> playerPersistenceDtos, List<ItemPersistenceDto> currentItemsPersistenceDtos, List<CardPersistenceDto> stackPersistenceDtos) {
        Players players = new Players(
                playerPersistenceDtos.stream()
                        .map(playerPersistenceMapper::toDomain)
                        .collect(Collectors.toList()),
                PlayerId.fromString(gamePersistenceDto.currentPlayerId())
        );
        Stack stack = new Stack(stackPersistenceDtos.stream()
                .map(cardPersistenceMapper::toDomain)
                .collect(Collectors.toList()));

        List<Moveable> currentItems = currentItemsPersistenceDtos.stream()
                .map(currentItemPersistenceMapper::toDomain)
                .collect(Collectors.toList());

        return new Game(
                GameId.fromString(gamePersistenceDto.id()),
                GameStatus.valueOf(gameStatusPersistenceDto),
                players,
                stack,
                new CurrentDeck(currentItems),
                new GameInitializer(),
                new GameValidator()
        );
    }

    public GamePersistenceDto toDto(Game game) {
        return new GamePersistenceDto(
                game.getId().toString(),
                game.getCurrentPlayer().getId().toString(),
                game.getCurrentCard().getId().toString()
        );
    }
}
