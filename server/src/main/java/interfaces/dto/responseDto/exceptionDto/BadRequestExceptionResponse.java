package interfaces.dto.responseDto.exceptionDto;

import interfaces.dto.responseDto.EventResponseStatus;

public class BadRequestExceptionResponse extends EventExceptionResponse {
    private static final int CODE = 400;

    public BadRequestExceptionResponse(EventResponseStatus status, String message) {
        super(status, CODE, message);
    }
}
