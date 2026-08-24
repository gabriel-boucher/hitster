package interfaces.http.playlist.addPlaylist;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.room.exception.PlaylistAlreadyInRoomException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;
import interfaces.http.playlist.addPlaylist.dto.AddPlaylistData;
import interfaces.http.playlist.addPlaylist.dto.AddPlaylistRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddPlaylistHandler implements RestEventHandlerWithRequest<AddPlaylistRequest> {
    private final RoomAppService roomAppService;
    private final AddPlaylistMapper addPlaylistMapper;

    public AddPlaylistHandler(RoomAppService roomAppService, AddPlaylistMapper addPlaylistMapper) {
        this.roomAppService = roomAppService;
        this.addPlaylistMapper = addPlaylistMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, AddPlaylistRequest request) {
        try {
            AddPlaylistData data = addPlaylistMapper.toDomain(gameId, playerId, request);
            roomAppService.addPlaylist(data.gameId(), data.playerId(), data.playlist());

            return new OkSuccessResponse<>(ADD_PLAYLIST, "Playlist added successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlaylistAlreadyInRoomException e) {
            return new BadRequestExceptionResponse(PLAYLIST_ALREADY_IN_ROOM, e.getMessage());
        }
    }
}

