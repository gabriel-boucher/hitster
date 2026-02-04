package domain.game.item.card;

import domain.game.item.ItemStatus;

public class CardBuilder {
    private CardId id = new CardId("default-id");
    private ItemStatus status = ItemStatus.BOARD;
    private String song = "default-song";
    private String artist = "default-artist";
    private int date = 0;
    private String albumUrl = "default-album-url";

    public CardBuilder withId(CardId id) {
        this.id = id;
        return this;
    }

    public CardBuilder withStatus(ItemStatus status) {
        this.status = status;
        return this;
    }

    public CardBuilder withSong(String song) {
        this.song = song;
        return this;
    }

    public CardBuilder withArtist(String artist) {
        this.artist = artist;
        return this;
    }

    public CardBuilder withDate(int date) {
        this.date = date;
        return this;
    }

    public CardBuilder withAlbumUrl(String albumUrl) {
        this.albumUrl = albumUrl;
        return this;
    }

    public Card build() {
        return new Card(id, status, song, artist, date, albumUrl);
    }
}