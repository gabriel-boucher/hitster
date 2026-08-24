package infrastructure.persistence.dao;

import infrastructure.persistence.dto.PlaylistPersistenceDto;

import java.util.List;

public interface PlaylistDao {
    List<PlaylistPersistenceDto> getPlaylistsByGameId(String gameId);
    void saveByGameId(String gameId, List<PlaylistPersistenceDto> playlists);
}
