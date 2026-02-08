package interfaces.rest.spotify;

import application.SpotifyAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.spotify.playback.PlaybackState;
import domain.spotify.playlist.Playlist;
import domain.spotify.accessToken.AccessToken;
import interfaces.rest.spotify.getAccessToken.GetAccessTokenMapper;
import interfaces.rest.spotify.getAccessToken.dto.GetAccessTokenData;
import interfaces.rest.spotify.getAccessToken.dto.GetAccessTokenResponse;
import interfaces.rest.spotify.playback.pause.PauseData;
import interfaces.rest.spotify.playback.pause.PauseMapper;
import interfaces.rest.spotify.playback.pause.PauseRequest;
import interfaces.rest.spotify.playback.play.PlayData;
import interfaces.rest.spotify.playback.play.PlayMapper;
import interfaces.rest.spotify.playback.play.PlayRequest;
import interfaces.rest.spotify.playback.seekToPosition.SeekToPositionData;
import interfaces.rest.spotify.playback.seekToPosition.SeekToPositionMapper;
import interfaces.rest.spotify.playback.seekToPosition.SeekToPositionRequest;
import interfaces.rest.spotify.playback.setVolume.SetVolumeData;
import interfaces.rest.spotify.playback.setVolume.SetVolumeMapper;
import interfaces.rest.spotify.playback.setVolume.SetVolumeRequest;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistData;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistResponse;
import interfaces.rest.spotify.searchPlaylists.SearchPlaylistMapper;
import interfaces.socket.SocketEventBroadcaster;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/spotify/")
public class SpotifyResource {
    private final SpotifyAppService spotifyAppService;
    private final SearchPlaylistMapper searchPlaylistMapper;
    private final GetAccessTokenMapper getAccessTokenMapper;
    private final PlayMapper playMapper;
    private final PauseMapper pauseMapper;
    private final SetVolumeMapper setVolumeMapper;
    private final SeekToPositionMapper seekToPositionMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private SocketIOServer socketIOServer;

    public SpotifyResource(SpotifyAppService spotifyAppService, SearchPlaylistMapper searchPlaylistMapper, GetAccessTokenMapper getAccessTokenMapper, PlayMapper playMapper, PauseMapper pauseMapper, SetVolumeMapper setVolumeMapper, SeekToPositionMapper seekToPositionMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.spotifyAppService = spotifyAppService;
        this.searchPlaylistMapper = searchPlaylistMapper;
        this.getAccessTokenMapper = getAccessTokenMapper;
        this.playMapper = playMapper;
        this.pauseMapper = pauseMapper;
        this.setVolumeMapper = setVolumeMapper;
        this.seekToPositionMapper = seekToPositionMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    public void setSocketIOServer(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    @GET
    @Path("search-playlists")
    @Produces(MediaType.APPLICATION_JSON)
    public SearchPlaylistResponse searchPlaylists(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            @QueryParam("query") String query) {
        System.out.println("Searching playlists with query: " + query + " for roomId: " + roomId + " and playerId: " + playerId);

        SearchPlaylistData data = searchPlaylistMapper.toDomain(roomId, playerId);
        List<Playlist> playlists = spotifyAppService.searchPlaylists(data.roomId(), data.playerId(), query);

        return searchPlaylistMapper.toDto(playlists);
    }

    @GET
    @Path("access-token")
    @Produces(MediaType.APPLICATION_JSON)
    public GetAccessTokenResponse getAccessToken(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId
    ) {
        GetAccessTokenData data = getAccessTokenMapper.toDomain(roomId, playerId);
        AccessToken accessToken = spotifyAppService.getAccessToken(data.roomId(), data.playerId());

        return getAccessTokenMapper.toDto(accessToken);
    }

    @PUT
    @Path("playback/transfer")
    @Consumes(MediaType.APPLICATION_JSON)
    public void transfer(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            PlayRequest request
    ) {
        PlayData data = playMapper.toDomain(roomId, playerId, request);
        PlaybackState playbackState = spotifyAppService.play(data.roomId(), data.playerId(), data.deviceId());
        socketEventBroadcaster.broadCastPlaybackState(playbackState, roomId, socketIOServer);
    }

    @PUT
    @Path("playback/play")
    @Consumes(MediaType.APPLICATION_JSON)
    public void play(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            PlayRequest request
    ) {
        PlayData data = playMapper.toDomain(roomId, playerId, request);
        PlaybackState playbackState = spotifyAppService.play(data.roomId(), data.playerId(), data.deviceId());
        socketEventBroadcaster.broadCastPlaybackState(playbackState, roomId, socketIOServer);
    }

    @PUT
    @Path("playback/pause")
    @Consumes(MediaType.APPLICATION_JSON)
    public void pause(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            PauseRequest request
    ) {
        PauseData data = pauseMapper.toDomain(roomId, playerId, request);
        PlaybackState playbackState = spotifyAppService.pause(data.roomId(), data.playerId(), data.deviceId());
        socketEventBroadcaster.broadCastPlaybackState(playbackState, roomId, socketIOServer);
    }

    @PUT
    @Path("playback/volume")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setVolume(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            SetVolumeRequest request
    ) {
        SetVolumeData data = setVolumeMapper.toDomain(roomId, playerId, request);
        PlaybackState playbackState = spotifyAppService.setVolume(data.roomId(), data.playerId(), data.deviceId(), data.volumePercent());
        socketEventBroadcaster.broadCastPlaybackState(playbackState, roomId, socketIOServer);
    }

    @PUT
    @Path("playback/seek")
    @Consumes(MediaType.APPLICATION_JSON)
    public void seekToPosition(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            SeekToPositionRequest request
    ) {
        SeekToPositionData data = seekToPositionMapper.toDomain(roomId, playerId, request);
        PlaybackState playbackState = spotifyAppService.seekToPosition(data.roomId(), data.playerId(), data.deviceId(), data.positionMs());
        socketEventBroadcaster.broadCastPlaybackState(playbackState, roomId, socketIOServer);
    }
}
