package interfaces.dto.responseDto.successDto;

import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.EventResponseStatus;

public abstract class EventSuccessResponse<SuccessResponse> extends EventResponse {
    private static final boolean SUCCESS = true;

    public final SuccessResponse data;

    public EventSuccessResponse(EventResponseStatus status, int code, SuccessResponse data) {
        super(SUCCESS, status, code);
        this.data = data;
    }
}
