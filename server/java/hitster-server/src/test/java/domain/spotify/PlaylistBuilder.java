package domain.spotify;

public class PlaylistBuilder {
    private PlaylistId id = new PlaylistId("default-playlist-id");
    private String name = "Default Playlist";
    private String imageUrl = "Default Owner";

    public PlaylistBuilder withId(PlaylistId id) {
        this.id = id;
        return this;
    }

    public PlaylistBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public PlaylistBuilder withImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public Playlist build() {
        return new Playlist(id, name, imageUrl);
    }
}
