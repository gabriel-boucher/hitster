package domain.music;

import domain.game.item.card.Card;
import domain.room.RoomId;

import java.util.List;

public interface MusicRepository {
    List<Playlist> searchPlaylistsByQuery(RoomId roomId, String query);
    List<Card> getCardsByPlaylistId(RoomId roomId, List<PlaylistId> playlistIds);
}