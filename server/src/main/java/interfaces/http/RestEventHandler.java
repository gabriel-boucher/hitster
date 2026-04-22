package interfaces.http;

import interfaces.dto.responseDto.EventResponse;

public interface RestEventHandler<RestEventRequest> {
    EventResponse handleEvent(RestEventRequest request);
}
