package interfaces.http.playlist.addPlaylist.dto;

import domain.game.GameId;
import domain.player.PlayerId;
import domain.music.Playlist;

public record AddPlaylistData(
        GameId gameId,
        PlayerId playerId,
        Playlist playlist
) {
}

