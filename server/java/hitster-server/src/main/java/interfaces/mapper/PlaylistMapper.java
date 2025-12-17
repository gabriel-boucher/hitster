package interfaces.mapper;

import domain.spotify.Playlist;
import domain.spotify.PlaylistId;
import interfaces.dto.PlaylistDto;

public class PlaylistMapper {
    public Playlist toDomain(PlaylistDto playlistDto) {
        return new Playlist(
                new PlaylistId(playlistDto.id()),
                playlistDto.name(),
                playlistDto.imageUrl()
        );
    }

    public PlaylistDto toDto(Playlist playlist) {
        return new PlaylistDto(
                playlist.id().toString(),
                playlist.name(),
                playlist.imageUrl()
        );
    }
}
