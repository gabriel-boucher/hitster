package interfaces.http.music.removePlaylist;

import domain.game.GameId;
import domain.player.PlayerId;
import domain.music.PlaylistId;
import interfaces.http.music.removePlaylist.dto.RemovePlaylistData;
import interfaces.http.music.removePlaylist.dto.RemovePlaylistRequest;

public class RemovePlaylistMapper {
    public RemovePlaylistData toDomain(RemovePlaylistRequest request) {
        return new RemovePlaylistData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                new PlaylistId(request.playlistId())
        );
    }
}

