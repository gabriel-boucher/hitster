package infrastructure.music.repository;

import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.card.CardId;
import domain.music.Playlist;
import domain.music.PlaylistId;
import domain.music.MusicRepository;
import domain.room.RoomId;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InMemoryMusicRepository implements MusicRepository {
    private final HashMap<PlaylistId, Playlist> playlists;
    private final HashMap<PlaylistId, List<Card>> cards;

    public InMemoryMusicRepository() {
        this.playlists = initializePlaylists();
        this.cards = initializeCards();
    }

    private HashMap<PlaylistId, Playlist> initializePlaylists() {
        HashMap<PlaylistId, Playlist> playlists = new HashMap<>();

        Playlist playlist1 = new Playlist(new PlaylistId("1"), "Chill Good Vibes Mix", "https://seed-mix-image.spotifycdn.com/v6/img/desc/Chill%20Good%20Vibes/en/default", 10);
        Playlist playlist2 = new Playlist(new PlaylistId("2"), "Bangers Workout Mix", "https://seed-mix-image.spotifycdn.com/v6/img/desc/Bangers%20Workout/en/default", 10);
        Playlist playlist3 = new Playlist(new PlaylistId("3"), "Top 50 Global", "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg", 10);

        playlists.put(playlist1.id(), playlist1);
        playlists.put(playlist2.id(), playlist2);
        playlists.put(playlist3.id(), playlist3);

        return playlists;
    }

    private HashMap<PlaylistId, List<Card>> initializeCards() {
        HashMap<PlaylistId, List<Card>> cards = new HashMap<>();

        List<Card> cards1 = new ArrayList<>(List.of(
                new Card(new CardId("1"), ItemStatus.UNUSED, "Starlight", "Muse", 2006, "https://i.scdn.co/image/ab67616d00001e0228933b808bfb4cbbd0385400"),
                new Card(new CardId("2"), ItemStatus.UNUSED, "Supermassive Black Hole", "Muse", 2006, "https://i.scdn.co/image/ab67616d00001e0228933b808bfb4cbbd0385400"),
                new Card(new CardId("3"), ItemStatus.UNUSED, "What's My Age Again?", "blink-182", 1999, "https://i.scdn.co/image/ab67616d00001e026da502e35a7a3e48de2b0f74"),
                new Card(new CardId("4"), ItemStatus.UNUSED, "When I Come Around", "Green Day", 1994, "https://i.scdn.co/image/ab67616d00001e02db89b08034de626ebee6823d"),
                new Card(new CardId("5"), ItemStatus.UNUSED, "Dreams - 2004 Remaster", "Fleetwood Mac", 1977, "https://i.scdn.co/image/ab67616d00001e02e52a59a28efa4773dd2bfe1b"),
                new Card(new CardId("6"), ItemStatus.UNUSED, "Chemical", "Post Malone", 2023, "https://i.scdn.co/image/ab67616d00001e0271cae34ad5a39bdab78af13e"),
                new Card(new CardId("7"), ItemStatus.UNUSED, "Kids", "MGMT", 2007, "https://i.scdn.co/image/ab67616d00001e028b32b139981e79f2ebe005eb"),
                new Card(new CardId("8"), ItemStatus.UNUSED, "You Know I'm No Good", "Amy Winehouse", 2006, "https://i.scdn.co/image/ab67616d00001e0276ffb5b5ab045d22c81235c1"),
                new Card(new CardId("9"), ItemStatus.UNUSED, "Comfortably Numb", "Pink Floyd", 1979, "https://i.scdn.co/image/ab67616d00001e025d48e2f56d691f9a4e4b0bdf"),
                new Card(new CardId("10"), ItemStatus.UNUSED, "Homecoming", "Kanye West, Chris Martin", 2007, "https://i.scdn.co/image/ab67616d00001e0226f7f19c7f0381e56156c94a")
        ));

        List<Card> cards2 = new ArrayList<>(List.of(
                new Card(new CardId("11"), ItemStatus.UNUSED, "Stronger", "Kanye West", 2007, "https://i.scdn.co/image/ab67616d00001e0226f7f19c7f0381e56156c94a"),
                new Card(new CardId("12"), ItemStatus.UNUSED, "Can't Hold Us", "Macklemore & Ryan Lewis", 2011, "https://i.scdn.co/image/ab67616d00001e0298a02fef3a8b1d80a0f164ec"),
                new Card(new CardId("13"), ItemStatus.UNUSED, "Titanium", "David Guetta, Sia", 2011, "https://i.scdn.co/image/ab67616d00001e02b234aeff6eedc8276fe0333a"),
                new Card(new CardId("14"), ItemStatus.UNUSED, "POWER", "Kanye West", 2010, "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f"),
                new Card(new CardId("15"), ItemStatus.UNUSED, "Remember the Name", "Fort Minor", 2005, "https://i.scdn.co/image/ab67616d00001e02617b7d3433ff3a447faa7c08"),
                new Card(new CardId("16"), ItemStatus.UNUSED, "Till I Collapse", "Eminem, Nate Dogg", 2002, "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4"),
                new Card(new CardId("17"), ItemStatus.UNUSED, "Believer", "Imagine Dragons", 2017, "https://i.scdn.co/image/ab67616d00001e025675e83f707f1d7271e5cf8a"),
                new Card(new CardId("18"), ItemStatus.UNUSED, "Eye of the Tiger", "Survivor", 1982, "https://i.scdn.co/image/ab67616d00001e02f4a2ccbe20d6d52f16816812"),
                new Card(new CardId("19"), ItemStatus.UNUSED, "Don't Stop Me Now", "Queen", 1978, "https://i.scdn.co/image/ab67616d00001e02008b06ec71019afd70153889"),
                new Card(new CardId("20"), ItemStatus.UNUSED, "Blinding Lights", "The Weeknd", 2019, "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36")
        ));

        List<Card> cards3 = new ArrayList<>(List.of(
                new Card(new CardId("21"), ItemStatus.UNUSED, "Flowers", "Miley Cyrus", 2023, "https://i.scdn.co/image/ab67616d00001e0266fd0917f38d472c8576754e"),
                new Card(new CardId("22"), ItemStatus.UNUSED, "As It Was", "Harry Styles", 2022, "https://i.scdn.co/image/ab67616d00001e0282ce362511fb3d9dda6578ee"),
                new Card(new CardId("23"), ItemStatus.UNUSED, "Anti-Hero", "Taylor Swift", 2022, "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5"),
                new Card(new CardId("24"), ItemStatus.UNUSED, "Calm Down", "Rema, Selena Gomez", 2022, "https://i.scdn.co/image/ab67616d00001e02a3a7f38ea2033aa501afd4cf"),
                new Card(new CardId("25"), ItemStatus.UNUSED, "Unholy", "Sam Smith, Kim Petras", 2022, "https://i.scdn.co/image/ab67616d00001e02a935e4689f15953311772cc4"),
                new Card(new CardId("26"), ItemStatus.UNUSED, "Dance The Night", "Dua Lipa", 2023, "https://i.scdn.co/image/ab67616d00001e02f201eaede4f6a6a071e64a83"),
                new Card(new CardId("27"), ItemStatus.UNUSED, "Seven", "Jung Kook, Latto", 2023, "https://i.scdn.co/image/ab67616d00001e02bf5cce5a0e1ed03a626bdd74"),
                new Card(new CardId("28"), ItemStatus.UNUSED, "Paint The Town Red", "Doja Cat", 2023, "https://i.scdn.co/image/ab67616d00001e02e69a141e4ffe839c38c4c228"),
                new Card(new CardId("29"), ItemStatus.UNUSED, "Levitating", "Dua Lipa", 2020, "https://i.scdn.co/image/ab67616d00001e024bc66095f8a70bc4e6593f4f"),
                new Card(new CardId("30"), ItemStatus.UNUSED, "STAY", "The Kid LAROI, Justin Bieber", 2021, "https://i.scdn.co/image/ab67616d00001e02aed1660585c1e3c9ffb50b6a")
        ));

        cards.put(new PlaylistId("1"), cards1);
        cards.put(new PlaylistId("2"), cards2);
        cards.put(new PlaylistId("3"), cards3);

        return cards;
    }

    @Override
    public List<Playlist> searchPlaylistsByQuery(RoomId roomId, String query) {
        return playlists.values()
                .stream()
                .filter(playlist -> playlist.name().toLowerCase().contains(query.toLowerCase()))
                .toList();
    }

    @Override
    public List<Card> getCardsByPlaylistId(RoomId roomId, List<PlaylistId> playlistIds) {
        return playlistIds.stream()
                .filter(cards::containsKey)
                .flatMap(id -> cards.get(id).stream())
                .toList();
    }
}
