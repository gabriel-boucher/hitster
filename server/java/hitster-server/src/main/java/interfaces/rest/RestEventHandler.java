package interfaces.rest;

import interfaces.dto.responseDto.EventResponse;

public interface RestEventHandler<RestEventRequest> {
    EventResponse handleEvent(RestEventRequest request);
}
