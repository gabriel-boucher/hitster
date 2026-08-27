package domain.player;

import domain.deck.item.card.Card;
import domain.exception.PlayerNotFoundException;

import java.util.List;

public class Players {
    private final List<Player> players;
    private PlayerId currentPlayerId;

    public Players(List<Player> players, PlayerId currentPlayerId) {
        this.players = players;
        this.currentPlayerId = currentPlayerId;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public Player getCurrentPlayer() {
        return getPlayerById(currentPlayerId);
    }

    public Player getPlayerById(PlayerId playerId) {
        return players.stream()
                .filter(p -> p.getId().equals(playerId))
                .findFirst()
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
    }

    public List<Card> getCurrentPlayerCards() {
        return getCurrentPlayer().getDeck().getCards();
    }

    public void setCurrentPlayerId(PlayerId currentPlayerId) {
        this.currentPlayerId = currentPlayerId;
    }

    public void setNextPlayer() {
        for (int i = 0; i < players.size(); i++) {
            if (players.get(i).getId().equals(currentPlayerId)) {
                int nextIndex = (i + 1) % players.size(); // wrap to 0 if last
                Player player = players.get(nextIndex);
                if (player.isPlaying()) {
                    setCurrentPlayerId(player.getId());
                    return;
                }
            }
        }
    }

    public void setTokensForNextTurn() {
        for (Player player : players) {
            player.setTokensForNextTurn();
        }
    }

    public void setTokensForCancelTurn() {
        for (Player player : players) {
            player.setTokensForCancelTurn();
        }
    }
}
