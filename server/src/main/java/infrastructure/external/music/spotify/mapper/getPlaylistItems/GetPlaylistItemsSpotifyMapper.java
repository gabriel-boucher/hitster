package infrastructure.external.music.spotify.mapper.getPlaylistItems;

import domain.deck.item.ItemStatus;
import domain.deck.item.card.Card;
import domain.deck.item.card.CardId;
import infrastructure.external.music.spotify.dto.getPlaylistItems.GetPlaylistItemsSpotifyDto;

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
