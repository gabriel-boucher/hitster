package domain.player;

import domain.game.item.card.Card;
import domain.exception.PlayerNotFoundException;

import java.util.List;

public class Players {
    private final List<Player> players;
    private PlayerId currentPlayerId;

    public Players(List<Player> players) {
        this.players = players;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public PlayerId getCurrentPlayerId() {
        return currentPlayerId;
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
                setCurrentPlayerId(players.get(nextIndex).getId());
                break;
            }
        }
    }
}
