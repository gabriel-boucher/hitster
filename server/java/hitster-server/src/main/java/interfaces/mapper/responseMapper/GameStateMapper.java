package interfaces.mapper.responseMapper;

import domain.game.Game;
import domain.game.item.card.Card;
import interfaces.mapper.CurrentDeckMapper;
import interfaces.mapper.PlayerMapper;
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
