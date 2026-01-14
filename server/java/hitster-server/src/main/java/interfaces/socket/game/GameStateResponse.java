package interfaces.socket.game;

import interfaces.dto.CardDto;
import interfaces.dto.CurrentDeckDto;
import interfaces.dto.PlayerDto;

import java.util.List;

public record GameStateResponse(
        String id,
        String status,
        List<PlayerDto> players,
        CurrentDeckDto currentDeck,
        CardDto currentCard,
        int currentPlayerIndex
) {
}
