package infrastructure;

import domain.spotify.Playlist;
import domain.spotify.PlaylistId;
import domain.spotify.PlaylistRepository;

import java.util.ArrayList;
import java.util.List;

public class InMemoryPlaylistRepository implements PlaylistRepository {
    private final List<Playlist> playlists;

    public InMemoryPlaylistRepository() {
        this.playlists = new ArrayList<>(List.of(
            new Playlist(new PlaylistId("1"), "Chill Vibes", "https://example.com/chillvibes"),
            new Playlist(new PlaylistId("2"), "Workout Hits", "https://example.com/workouthits"),
            new Playlist(new PlaylistId("3"), "Top 50 Global", "https://example.com/top50global")
        ));
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(String query) {
        return playlists;
    }
}
