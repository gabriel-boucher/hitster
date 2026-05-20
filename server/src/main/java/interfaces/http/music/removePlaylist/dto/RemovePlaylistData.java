package interfaces.http.music.removePlaylist.dto;

import domain.game.GameId;
import domain.player.PlayerId;
import domain.music.PlaylistId;

public record RemovePlaylistData(
        GameId gameId,
        PlayerId playerId,
        PlaylistId playlistId
) {
}

