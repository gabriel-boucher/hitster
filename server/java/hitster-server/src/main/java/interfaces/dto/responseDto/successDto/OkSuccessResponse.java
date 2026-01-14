package interfaces.dto.responseDto.successDto;

import interfaces.dto.responseDto.EventResponseStatus;

public class OkSuccessResponse<SuccessResponse> extends EventSuccessResponse {
    private static final int CODE = 200;

    public OkSuccessResponse(EventResponseStatus status, SuccessResponse data) {
        super(status, CODE, data);
    }
}
