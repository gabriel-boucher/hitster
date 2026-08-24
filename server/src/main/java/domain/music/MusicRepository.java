package domain.music;

import domain.game.GameId;
import domain.deck.item.card.Card;

import java.util.List;

public interface MusicRepository {
    List<Playlist> searchPlaylistsByQuery(GameId gameId, String query);
    List<Card> getCardsByPlaylistId(GameId gameId, List<PlaylistId> playlistIds);
}