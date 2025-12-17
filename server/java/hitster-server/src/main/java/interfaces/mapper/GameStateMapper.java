package interfaces.mapper;

import domain.game.Game;
import interfaces.socket.game.dto.GameStateResponse;

public class GameStateMapper {
    private final PlayerMapper playerMapper;
    private final CurrentDeckMapper currentDeckMapper;
    private final CardMapper cardMapper;

    public GameStateMapper(PlayerMapper playerMapper, CurrentDeckMapper currentDeckMapper, CardMapper cardMapper) {
        this.playerMapper = playerMapper;
        this.currentDeckMapper = currentDeckMapper;
        this.cardMapper = cardMapper;
    }

    public GameStateResponse toDto(Game game) {
        return new GameStateResponse(
                game.getId().toString(),
                game.getPlayers().stream().map(playerMapper::toDto).toList(),
                currentDeckMapper.toDto(game.getCurrentDeck()),
                cardMapper.toDto(game.getCurrentCard()),
                game.getCurrentPlayerIndex()
        );
    }
}
