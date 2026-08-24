package interfaces.http;

import interfaces.dto.responseDto.EventResponse;

public interface RestEventHandler {
    EventResponse handleEvent(String gameId, String playerId);
}
