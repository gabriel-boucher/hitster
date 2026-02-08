package infrastructure.playback.mapper;

import domain.spotify.playback.PlaybackState;
import infrastructure.playback.dto.getPlaybackState.GetPlaybackStateSpotifyDto;

public class GetPlaybackStateSpotifyMapper {
    public PlaybackState toDomain(GetPlaybackStateSpotifyDto getPlaybackStateSpotifyDto) {
        return new PlaybackState(
                getPlaybackStateSpotifyDto.isPlaying(),
                getPlaybackStateSpotifyDto.device().volumePercent(),
                getPlaybackStateSpotifyDto.timePosition(),
                getPlaybackStateSpotifyDto.item().duration()
        );
    }
}
