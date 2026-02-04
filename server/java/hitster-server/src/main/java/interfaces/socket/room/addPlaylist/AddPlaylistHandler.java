package interfaces.socket.room.addPlaylist;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlaylistAlreadyInRoomException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.addPlaylist.dto.AddPlaylistData;
import interfaces.socket.room.addPlaylist.dto.AddPlaylistRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddPlaylistHandler implements SocketEventHandler<AddPlaylistRequest> {
    private final RoomAppService roomAppService;
    private final AddPlaylistMapper addPlaylistMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public AddPlaylistHandler(RoomAppService roomAppService, AddPlaylistMapper addPlaylistMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.roomAppService = roomAppService;
        this.addPlaylistMapper = addPlaylistMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, AddPlaylistRequest request, AckRequest ackRequest) {
        try {
            AddPlaylistData data = addPlaylistMapper.toDomain(request);
            Room room = roomAppService.addPlaylist(data.roomId(), data.playerId(), data.playlist());

            socketEventBroadcaster.broadcastRoomState(room, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (PlaylistAlreadyInRoomException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYLIST_ALREADY_IN_ROOM, e.getMessage()));
        }
    }
}
