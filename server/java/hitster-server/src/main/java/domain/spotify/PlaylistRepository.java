package domain.spotify;

import java.util.List;

public interface PlaylistRepository {
    List<Playlist> searchPlaylistsByQuery(String query);
}
