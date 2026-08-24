package infrastructure.persistence.mapper;

import domain.music.Playlist;
import domain.music.PlaylistId;
import infrastructure.persistence.dto.PlaylistPersistenceDto;

public class PlaylistPersistenceMapper {
    public Playlist toDomain(PlaylistPersistenceDto dto) {
        return new Playlist(
                new PlaylistId(dto.id()),
                dto.name(),
                dto.imageUrl(),
                dto.totalTracks()
        );
    }

    public PlaylistPersistenceDto toDto(Playlist playlist) {
        return new PlaylistPersistenceDto(
                playlist.id().toString(),
                playlist.name(),
                playlist.imageUrl(),
                playlist.totalTracks()
        );
    }
}
