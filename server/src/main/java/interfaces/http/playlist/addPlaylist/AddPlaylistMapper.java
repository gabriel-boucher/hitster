package interfaces.http.playlist.addPlaylist;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.mapper.PlaylistMapper;
import interfaces.http.playlist.addPlaylist.dto.AddPlaylistData;
import interfaces.http.playlist.addPlaylist.dto.AddPlaylistRequest;

public class AddPlaylistMapper {
    private final PlaylistMapper playlistMapper;

    public AddPlaylistMapper(PlaylistMapper playlistMapper) {
        this.playlistMapper = playlistMapper;
    }

    public AddPlaylistData toDomain(String gameId, String playerId, AddPlaylistRequest request) {
        return new AddPlaylistData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                playlistMapper.toDomain(request.playlist())
        );
    }
}

