package domain.spotify;

import domain.game.item.card.Card;
import domain.spotify.accessToken.AccessToken;

import java.util.List;

public interface PlaylistRepository {
    List<Playlist> searchPlaylistsByQuery(AccessToken accessToken, String query);
    List<Card> getCardsByPlaylistId(AccessToken accessToken, List<PlaylistId> playlistIds);
}
