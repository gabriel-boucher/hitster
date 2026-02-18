package infrastructure.music.mapper.getPlaylistItems;

import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.card.CardId;
import infrastructure.music.dto.getPlaylistItems.GetPlaylistItemsSpotifyDto;

import java.util.List;

public class GetPlaylistItemsSpotifyMapper {
    public List<Card> toDomain(GetPlaylistItemsSpotifyDto dto) {
        return dto.items().stream()
                .map(item -> new Card(
                        new CardId(item.track().id()),
                        ItemStatus.UNUSED,
                        item.track().name(),
                        item.track().artists().getFirst().name(),
                        Integer.parseInt(item.track().album().releaseDate().substring(0, 4)),
                        item.track().album().images().getFirst().url()
                ))
                .toList();
    }
}
