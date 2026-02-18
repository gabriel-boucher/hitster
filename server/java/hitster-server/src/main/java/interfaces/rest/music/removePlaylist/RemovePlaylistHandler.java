package interfaces.rest.music.removePlaylist;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.rest.music.removePlaylist.dto.RemovePlaylistData;
import interfaces.rest.music.removePlaylist.dto.RemovePlaylistRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemovePlaylistHandler implements RestEventHandler<RemovePlaylistRequest> {
    private final RoomAppService roomAppService;
    private final RemovePlaylistMapper removePlaylistMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public RemovePlaylistHandler(RoomAppService roomAppService, RemovePlaylistMapper removePlaylistMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.removePlaylistMapper = removePlaylistMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(RemovePlaylistRequest request) {
        try {
            RemovePlaylistData data = removePlaylistMapper.toDomain(request);
            Room room = roomAppService.removePlaylist(data.roomId(), data.playerId(), data.playlistId());

            socketEventBroadcaster.broadcastRoomState(room, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(REMOVE_PLAYLIST, "Playlist removed successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlaylistNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYLIST_NOT_FOUND, e.getMessage());
        }
    }
}

