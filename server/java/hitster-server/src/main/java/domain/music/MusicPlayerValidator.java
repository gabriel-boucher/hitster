package domain.music;

import domain.player.Player;
import domain.player.PlayerId;
import domain.player.PlayerValidator;

import java.util.List;

public class MusicPlayerValidator {
    private final PlayerValidator playerValidator;

    public MusicPlayerValidator(PlayerValidator playerValidator) {
        this.playerValidator = playerValidator;
    }

    public void validatePlayerCanSearchPlaylists(PlayerId playerId, List<Player> players) {
        playerValidator.validatePlayerExist(playerId, players);
    }
}
