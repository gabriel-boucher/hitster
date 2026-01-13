package domain.spotify;

import domain.spotify.accessToken.AccessToken;

import java.util.List;

public interface PlaylistRepository {
    List<Playlist> searchPlaylistsByQuery(AccessToken accessToken, String query);
}
