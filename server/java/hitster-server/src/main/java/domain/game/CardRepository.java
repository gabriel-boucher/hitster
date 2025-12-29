package domain.game;

import domain.game.item.card.Card;
import domain.spotify.PlaylistId;

import java.util.List;

public interface CardRepository {
    List<Card> getCardsByPlaylistIds(List<PlaylistId> playlistIds);
}
