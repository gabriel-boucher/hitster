package interfaces.dto.responseDto.successDto;

import interfaces.dto.responseDto.EventResponseStatus;

public class CreatedSuccessResponse<SuccessResponse> extends EventSuccessResponse {
    private static final int CODE = 201;

    public CreatedSuccessResponse(EventResponseStatus status, SuccessResponse data) {
        super(status, CODE, data);
    }
}
