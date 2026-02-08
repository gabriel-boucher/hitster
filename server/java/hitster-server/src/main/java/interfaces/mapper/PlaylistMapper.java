package interfaces.mapper;

import domain.spotify.playlist.Playlist;
import domain.spotify.playlist.PlaylistId;
import interfaces.dto.PlaylistDto;

public class PlaylistMapper {
    public Playlist toDomain(PlaylistDto playlistDto) {
        return new Playlist(
                new PlaylistId(playlistDto.id()),
                playlistDto.name(),
                playlistDto.imageUrl(),
                playlistDto.totalTracks()
        );
    }

    public PlaylistDto toDto(Playlist playlist) {
        return new PlaylistDto(
                playlist.id().toString(),
                playlist.name(),
                playlist.imageUrl(),
                playlist.totalTracks()
        );
    }
}
