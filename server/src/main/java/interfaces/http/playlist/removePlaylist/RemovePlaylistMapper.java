package interfaces.http.playlist.removePlaylist;

import domain.game.GameId;
import domain.player.PlayerId;
import domain.music.PlaylistId;
import interfaces.http.playlist.removePlaylist.dto.RemovePlaylistData;
import interfaces.http.playlist.removePlaylist.dto.RemovePlaylistRequest;

public class RemovePlaylistMapper {
    public RemovePlaylistData toDomain(String gameId, String playerId, RemovePlaylistRequest request) {
        return new RemovePlaylistData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                new PlaylistId(request.playlistId())
        );
    }
}

