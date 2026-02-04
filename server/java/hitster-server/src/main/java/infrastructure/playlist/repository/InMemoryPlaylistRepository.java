package infrastructure.playlist.repository;

import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.card.CardId;
import domain.spotify.Playlist;
import domain.spotify.PlaylistId;
import domain.spotify.PlaylistRepository;
import domain.spotify.accessToken.AccessToken;

import java.util.ArrayList;
import java.util.List;

public class InMemoryPlaylistRepository implements PlaylistRepository {
    private final List<Playlist> playlists;

    public InMemoryPlaylistRepository() {
        this.playlists = new ArrayList<>(List.of(
            new Playlist(new PlaylistId("1"), "Chill Vibes", "https://example.com/chillvibes", 5),
            new Playlist(new PlaylistId("2"), "Workout Hits", "https://example.com/workouthits", 9),
            new Playlist(new PlaylistId("3"), "Top 50 Global", "https://example.com/top50global", 3)
        ));
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(AccessToken accessToken, String query) {
        return playlists;
    }

    @Override
    public List<Card> getCardsByPlaylistId(AccessToken accessToken, List<PlaylistId> playlistIds) {
        return new ArrayList<>(List.of(
                new Card(new CardId("1"), ItemStatus.UNUSED, "Starlight", "Muse", 2006, "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400"),
                new Card(new CardId("2"), ItemStatus.UNUSED, "Supermassive Black Hole", "Muse", 2006, "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400"),
                new Card(new CardId("3"), ItemStatus.UNUSED, "What's My Age Again?", "blink-182", 1999, "https://i.scdn.co/image/ab67616d0000b2736da502e35a7a3e48de2b0f74"),
                new Card(new CardId("4"), ItemStatus.UNUSED, "When I Come Around", "Green Day", 1994, "https://i.scdn.co/image/ab67616d0000b273db89b08034de626ebee6823d"),
                new Card(new CardId("5"), ItemStatus.UNUSED, "Dreams - 2004 Remaster", "Fleetwood Mac", 1977, "https://i.scdn.co/image/ab67616d0000b273e52a59a28efa4773dd2bfe1b"),
                new Card(new CardId("6"), ItemStatus.UNUSED, "Chemical", "Post Malone", 2023, "https://i.scdn.co/image/ab67616d0000b27371cae34ad5a39bdab78af13e"),
                new Card(new CardId("7"), ItemStatus.UNUSED, "Kids", "MGMT", 2007, "https://i.scdn.co/image/ab67616d0000b2738b32b139981e79f2ebe005eb"),
                new Card(new CardId("8"), ItemStatus.UNUSED, "You Know I'm No Good", "Amy Winehouse", 2006, "https://i.scdn.co/image/ab67616d0000b27376ffb5b5ab045d22c81235c1"),
                new Card(new CardId("9"), ItemStatus.UNUSED, "Comfortably Numb", "Pink Floyd", 1979, "https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf"),
                new Card(new CardId("10"), ItemStatus.UNUSED, "Homecoming", "Kanye West, Chris Martin", 2007, "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a")
        ));
    }
}
