package interfaces.dto.responseDto.exceptionDto;

import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.EventResponseStatus;

public abstract class EventExceptionResponse extends EventResponse {
    private final static boolean SUCCESS = false;

    public final String message;

    public EventExceptionResponse(EventResponseStatus status, int code, String message) {
        super(SUCCESS, status, code);
        this.message = message;
    }
}
