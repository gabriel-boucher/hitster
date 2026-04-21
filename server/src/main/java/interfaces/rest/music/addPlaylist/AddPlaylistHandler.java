package interfaces.rest.music.addPlaylist;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlaylistAlreadyInRoomException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.rest.music.addPlaylist.dto.AddPlaylistData;
import interfaces.rest.music.addPlaylist.dto.AddPlaylistRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddPlaylistHandler implements RestEventHandler<AddPlaylistRequest> {
    private final RoomAppService roomAppService;
    private final AddPlaylistMapper addPlaylistMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public AddPlaylistHandler(RoomAppService roomAppService, AddPlaylistMapper addPlaylistMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.addPlaylistMapper = addPlaylistMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(AddPlaylistRequest request) {
        try {
            AddPlaylistData data = addPlaylistMapper.toDomain(request);
            Room room = roomAppService.addPlaylist(data.roomId(), data.playerId(), data.playlist());

            socketEventBroadcaster.broadcastRoomState(room, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(ADD_PLAYLIST, "Playlist added successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlaylistAlreadyInRoomException e) {
            return new BadRequestExceptionResponse(PLAYLIST_ALREADY_IN_ROOM, e.getMessage());
        }
    }
}

