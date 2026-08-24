package interfaces.http;

import interfaces.dto.responseDto.EventResponse;

public interface RestEventHandlerWithRequest<RestEventRequest> {
    EventResponse handleEvent(String gameId, String playerId, RestEventRequest request);
}
