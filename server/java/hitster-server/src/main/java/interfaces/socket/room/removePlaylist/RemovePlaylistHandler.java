package interfaces.socket.room.removePlaylist;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.removePlaylist.dto.RemovePlaylistData;
import interfaces.socket.room.removePlaylist.dto.RemovePlaylistRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemovePlaylistHandler implements SocketEventHandler<RemovePlaylistRequest> {
    private final RoomAppService roomAppService;
    private final RemovePlaylistMapper removePlaylistMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public RemovePlaylistHandler(RoomAppService roomAppService, RemovePlaylistMapper removePlaylistMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.roomAppService = roomAppService;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.removePlaylistMapper = removePlaylistMapper;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, RemovePlaylistRequest request, AckRequest ackRequest) {
        try {
            RemovePlaylistData data = removePlaylistMapper.toDomain(request);
            Room room = roomAppService.removePlaylist(data.roomId(), data.playerId(), data.playlistId());

            socketEventBroadcaster.broadcastRoomState(room, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (PlaylistNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYLIST_NOT_FOUND, e.getMessage()));
        }
    }
}
