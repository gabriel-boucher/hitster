package interfaces.http.music.addPlaylist.dto;

import domain.game.GameId;
import domain.player.PlayerId;
import domain.music.Playlist;

public record AddPlaylistData(
        GameId gameId,
        PlayerId playerId,
        Playlist playlist
) {
}

