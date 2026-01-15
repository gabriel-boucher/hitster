package infrastructure.playlist.repository;

import domain.game.item.card.Card;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;
import domain.spotify.PlaylistRepository;
import domain.spotify.accessToken.AccessToken;

import java.util.ArrayList;
import java.util.List;

public class InMemoryPlaylistRepository implements PlaylistRepository {
    private final List<Playlist> playlists;

    public InMemoryPlaylistRepository() {
        this.playlists = new ArrayList<>(List.of(
            new Playlist(new PlaylistId("1"), "Chill Vibes", "https://example.com/chillvibes", 5),
            new Playlist(new PlaylistId("2"), "Workout Hits", "https://example.com/workouthits", 9),
            new Playlist(new PlaylistId("3"), "Top 50 Global", "https://example.com/top50global", 3)
        ));
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(AccessToken accessToken, String query) {
        return playlists;
    }

    @Override
    public List<Card> getCardsByPlaylistId(AccessToken accessToken, List<PlaylistId> playlistIds) {
        return List.of();
    }
}
