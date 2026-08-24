package interfaces.http.music.searchPlaylists;

import application.MusicAppService;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.music.Playlist;
import infrastructure.persistence.inMemory.music.exception.searchPlaylists.SearchPlaylistsSpotifyException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandlerWithRequest;

import java.util.List;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class SearchPlaylistsHandler implements RestEventHandlerWithRequest<SearchPlaylistsRequest> {
    private final MusicAppService musicAppService;
    private final SearchPlaylistsMapper searchPlaylistsMapper;

    public SearchPlaylistsHandler(MusicAppService musicAppService, SearchPlaylistsMapper searchPlaylistsMapper) {
        this.musicAppService = musicAppService;
        this.searchPlaylistsMapper = searchPlaylistsMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId, SearchPlaylistsRequest request) {
        try {
            SearchPlaylistsData data = searchPlaylistsMapper.toDomain(gameId, playerId, request);
            List<Playlist> playlists = musicAppService.searchPlaylists(data.gameId(), data.playerId(), data.query());
            SearchPlaylistsResponse response = searchPlaylistsMapper.toDto(playlists);

            return new OkSuccessResponse<>(SEARCH_PLAYLISTS, response);
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (SearchPlaylistsSpotifyException e) {
            return new BadRequestExceptionResponse(SEARCH_PLAYLISTS, e.getMessage());
        }
    }
}
