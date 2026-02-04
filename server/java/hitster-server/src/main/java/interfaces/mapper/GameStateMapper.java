package interfaces.mapper;

import domain.game.Game;
import domain.game.item.Moveable;
import domain.game.item.card.Card;
import interfaces.socket.game.GameStateResponse;

public class GameStateMapper {
    private final PlayerMapper playerMapper;
    private final CurrentDeckMapper currentDeckMapper;

    public GameStateMapper(PlayerMapper playerMapper, CurrentDeckMapper currentDeckMapper) {
        this.playerMapper = playerMapper;
        this.currentDeckMapper = currentDeckMapper;
    }

    public GameStateResponse toDto(Game game) {
        Card currentCard = game.getCurrentCard();
        return new GameStateResponse(
                game.getId().toString(),
                game.getStatus().toString(),
                game.getPlayers().stream().map(playerMapper::toDto).toList(),
                currentDeckMapper.toDto(game.getCurrentDeck(), currentCard),
                currentCard.getId().toString(),
                currentCard.getStatus().toString(),
                game.getCurrentPlayerId().toString()
        );
    }


}
