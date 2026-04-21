package interfaces.dto.responseDto.exceptionDto;

import interfaces.dto.responseDto.EventResponseStatus;

public class NotFoundExceptionResponse extends EventExceptionResponse {
    private static final int CODE = 404;

    public NotFoundExceptionResponse(EventResponseStatus status, String message) {
        super(status, CODE, message);
    }
}
