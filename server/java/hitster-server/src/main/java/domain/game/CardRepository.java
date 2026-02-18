package domain.game;

import domain.game.item.card.Card;
import domain.music.PlaylistId;

import java.util.List;

public interface CardRepository {
    List<Card> getCardsByPlaylistIds(List<PlaylistId> playlistIds);
}
