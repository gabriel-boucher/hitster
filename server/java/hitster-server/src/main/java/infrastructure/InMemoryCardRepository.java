package infrastructure;

import domain.game.CardRepository;
import domain.spotify.PlaylistId;
import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.card.CardId;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InMemoryCardRepository implements CardRepository {
    private final HashMap<PlaylistId, List<Card>> cards;

    public InMemoryCardRepository() {
        this.cards = new HashMap<>(
                Map.of(new PlaylistId("1"), List.of(
                        new Card(new CardId("1"), ItemStatus.INACTIVE, "Song A", "Artist A", 2020, "urlA"),
                        new Card(new CardId("2"), ItemStatus.INACTIVE, "Song B", "Artist B", 2019, "urlB"),
                        new Card(new CardId("3"), ItemStatus.INACTIVE, "Song C", "Artist C", 2021, "urlC"),
                        new Card(new CardId("4"), ItemStatus.INACTIVE, "Song D", "Artist D", 2018, "urlD"),
                        new Card(new CardId("5"), ItemStatus.INACTIVE, "Song E", "Artist E", 2022, "urlE")
                ))
        );
    }

    @Override
    public List<Card> getCardsByPlaylistIds(List<PlaylistId> playlistIds) {
        return playlistIds.stream()
                .flatMap(id -> cards.getOrDefault(id, List.of()).stream())
                .toList();
    }
}
