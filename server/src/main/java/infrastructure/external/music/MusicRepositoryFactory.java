package infrastructure.external.music;

import domain.music.MusicRepository;
import domain.room.Room;
import infrastructure.external.music.seed.SeedMusicRepository;
import infrastructure.external.music.spotify.SpotifyMusicRepository;

public class MusicRepositoryFactory {
    private final SeedMusicRepository seedMusicRepository;
    private final SpotifyMusicRepository spotifyMusicRepository;

    public MusicRepositoryFactory(SeedMusicRepository seedMusicRepository, SpotifyMusicRepository spotifyMusicRepository) {
        this.seedMusicRepository = seedMusicRepository;
        this.spotifyMusicRepository = spotifyMusicRepository;
    }

    public MusicRepository getMusicRepository(Room room) {
        return switch (room.getMusicPlayerType()) {
            case IN_MEMORY -> seedMusicRepository;
            case SPOTIFY -> spotifyMusicRepository;
        };
    }
}
