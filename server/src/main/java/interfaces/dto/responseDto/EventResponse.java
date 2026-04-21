package interfaces.dto.responseDto;

public abstract class EventResponse {
    public boolean success;
    public EventResponseStatus status;
    public int code;

    public EventResponse(boolean success, EventResponseStatus status, int code) {
        this.success = success;
        this.status = status;
        this.code = code;
    }
}
