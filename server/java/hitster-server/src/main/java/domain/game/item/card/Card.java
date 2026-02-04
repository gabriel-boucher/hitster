package domain.game.item.card;

import domain.game.item.Moveable;
import domain.game.item.ItemStatus;

public class Card implements Moveable {
    private final CardId id;
    private ItemStatus status;
    private final String song;
    private final String artist;
    private final int date;
    private final String albumUrl;

    public Card(CardId id, ItemStatus status, String song, String artist, int date, String albumUrl) {
        this.id = id;
        this.status = status;
        this.song = song;
        this.artist = artist;
        this.date = date;
        this.albumUrl = albumUrl;
    }

    public CardId getId() {
        return id;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public String getSong() {
        return song;
    }

    public String getArtist() {
        return artist;
    }

    public int getDate() {
        return date;
    }

    public String getAlbumUrl() {
        return albumUrl;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Card otherCard)) {
            return false;
        }
        return this.id.equals(otherCard.id);
    }
}
