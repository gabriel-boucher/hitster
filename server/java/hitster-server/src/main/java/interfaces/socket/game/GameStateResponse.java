package interfaces.socket.game;

import interfaces.dto.CardDto;
import interfaces.dto.MoveableDto;
import interfaces.dto.PlayerDto;

import java.util.List;

public record GameStateResponse(
        String id,
        String status,
        List<PlayerDto> players,
        List<MoveableDto> currentDeck,
        CardDto currentCard,
        int currentPlayerIndex
) {
}
