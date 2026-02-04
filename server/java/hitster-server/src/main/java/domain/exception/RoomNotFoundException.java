package domain.exception;

import domain.room.RoomId;
import interfaces.exception.NotFoundException;

public class RoomNotFoundException extends NotFoundException {
    public RoomNotFoundException(RoomId roomId) {
        super("Room with ID " + roomId + " not found.");
    }
}
