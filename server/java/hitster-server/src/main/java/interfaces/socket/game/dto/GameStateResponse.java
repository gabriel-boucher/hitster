package interfaces.socket.game.dto;

import interfaces.dto.CardDto;
import interfaces.dto.CurrentDeckDto;
import interfaces.dto.PlayerDto;

import java.util.List;

public record GameStateResponse(
        String gameId,
        List<PlayerDto> players,
        CurrentDeckDto currentDeck,
        CardDto currentCard,
        int currentPlayerIndex
) {
}
