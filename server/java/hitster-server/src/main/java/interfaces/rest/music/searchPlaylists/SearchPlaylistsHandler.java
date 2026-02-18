package interfaces.rest.music.searchPlaylists;

import application.MusicAppService;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.music.Playlist;
import infrastructure.music.exception.searchPlaylists.SearchPlaylistsSpotifyException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;

import java.util.List;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class SearchPlaylistsHandler implements RestEventHandler<SearchPlaylistsRequest> {
    private final MusicAppService musicAppService;
    private final SearchPlaylistsMapper searchPlaylistsMapper;

    public SearchPlaylistsHandler(MusicAppService musicAppService, SearchPlaylistsMapper searchPlaylistsMapper) {
        this.musicAppService = musicAppService;
        this.searchPlaylistsMapper = searchPlaylistsMapper;
    }

    @Override
    public EventResponse handleEvent(SearchPlaylistsRequest request) {
        try {
            SearchPlaylistsData data = searchPlaylistsMapper.toDomain(request);
            List<Playlist> playlists = musicAppService.searchPlaylists(data.roomId(), data.playerId(), data.query());
            SearchPlaylistsResponse response = searchPlaylistsMapper.toDto(playlists);

            return new OkSuccessResponse<>(SEARCH_PLAYLISTS, response);
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (SearchPlaylistsSpotifyException e) {
            return new BadRequestExceptionResponse(SEARCH_PLAYLISTS, e.getMessage());
        }
    }
}
