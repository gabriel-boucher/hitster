package application;

import domain.spotify.Playlist;
import domain.spotify.PlaylistRepository;

import java.util.List;

public class SpotifyAppService {
    private final PlaylistRepository playlistRepository;

    public SpotifyAppService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public List<Playlist> searchPlaylists(String query) {
        return playlistRepository.searchPlaylistsByQuery(query);
    }
}
