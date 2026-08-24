package interfaces.http.playlist.removePlaylist;

import application.RoomAppService;
import domain.exception.GameNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.PlaylistNotFoundException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;
import interfaces.http.playlist.removePlaylist.dto.RemovePlaylistData;
import interfaces.http.playlist.removePlaylist.dto.RemovePlaylistRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemovePlaylistHandler implements RestEventHandlerWithRequest<RemovePlaylistRequest> {
    private final RoomAppService roomAppService;
    private final RemovePlaylistMapper removePlaylistMapper;

    public RemovePlaylistHandler(RoomAppService roomAppService, RemovePlaylistMapper removePlaylistMapper) {
        this.roomAppService = roomAppService;
        this.removePlaylistMapper = removePlaylistMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, RemovePlaylistRequest request) {
        try {
            RemovePlaylistData data = removePlaylistMapper.toDomain(gameId, playerId, request);
            roomAppService.removePlaylist(data.gameId(), data.playerId(), data.playlistId());

            return new OkSuccessResponse<>(REMOVE_PLAYLIST, "Playlist removed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlaylistNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYLIST_NOT_FOUND, e.getMessage());
        }
    }
}

