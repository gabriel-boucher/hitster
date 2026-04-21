package infrastructure.music;

import domain.music.MusicRepository;
import domain.room.Room;
import infrastructure.music.repository.InMemoryMusicRepository;
import infrastructure.music.repository.SpotifyMusicRepository;

public class MusicRepositoryFactory {
    private final InMemoryMusicRepository inMemoryMusicRepository;
    private final SpotifyMusicRepository spotifyMusicRepository;

    public MusicRepositoryFactory(InMemoryMusicRepository inMemoryMusicRepository, SpotifyMusicRepository spotifyMusicRepository) {
        this.inMemoryMusicRepository = inMemoryMusicRepository;
        this.spotifyMusicRepository = spotifyMusicRepository;
    }

    public MusicRepository getMusicRepository(Room room) {
        return switch (room.getMusicPlayerType()) {
            case IN_MEMORY -> inMemoryMusicRepository;
            case SPOTIFY -> spotifyMusicRepository;
        };
    }
}
