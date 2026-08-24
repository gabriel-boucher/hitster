package infrastructure.persistence.inMemory.room.dao;

import infrastructure.persistence.dao.PlaylistDao;
import infrastructure.persistence.dto.PlaylistPersistenceDto;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public class PlaylistInMemoryDao implements PlaylistDao {
    private final Map<String, List<PlaylistPersistenceDto>> playlists;

    public PlaylistInMemoryDao(Map<String, List<PlaylistPersistenceDto>> playlists) {
        this.playlists = playlists;
    }

    @Override
    public List<PlaylistPersistenceDto> getPlaylistsByGameId(String gameId) {
        return playlists.getOrDefault(gameId, Collections.emptyList());
    }

    @Override
    public void saveByGameId(String gameId, List<PlaylistPersistenceDto> playlists) {
        this.playlists.put(gameId, playlists);
    }
}
