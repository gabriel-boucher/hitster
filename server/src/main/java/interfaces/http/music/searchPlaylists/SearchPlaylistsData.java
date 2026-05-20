package interfaces.http.music.searchPlaylists;

import domain.game.GameId;
import domain.player.PlayerId;

public record SearchPlaylistsData(
        GameId gameId,
        PlayerId playerId,
        String query
) {
}
