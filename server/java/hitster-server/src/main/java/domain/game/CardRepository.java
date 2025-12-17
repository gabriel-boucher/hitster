package domain.game;

import domain.game.deck.card.Card;
import domain.spotify.PlaylistId;

import java.util.List;

public interface CardRepository {
    List<Card> getCardsByPlaylistIds(List<PlaylistId> playlistIds);
}
