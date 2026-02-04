package interfaces.socket.game;

import interfaces.dto.MoveableDto;
import interfaces.dto.PlayerDto;

import java.util.List;

public record GameStateResponse(
        String id,
        String status,
        List<PlayerDto> players,
        List<MoveableDto> currentDeck,
        String currentCardId,
        String currentCardStatus,
        String currentPlayerId
) {
}
