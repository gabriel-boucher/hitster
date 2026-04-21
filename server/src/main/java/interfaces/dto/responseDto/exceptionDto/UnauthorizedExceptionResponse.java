package interfaces.dto.responseDto.exceptionDto;

import interfaces.dto.responseDto.EventResponseStatus;

public class UnauthorizedExceptionResponse extends EventExceptionResponse {
    private static final int CODE = 401;

    public UnauthorizedExceptionResponse(EventResponseStatus status, String message) {
        super(status, CODE, message);
    }
}
