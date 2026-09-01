package domain.player;

import domain.deck.Deck;
import interfaces.exception.NotImplementedException;

import java.util.ArrayList;
import java.util.List;

public class PlayerFactory {
    public Player create(PlayerId playerId, String playerName, List <Player> players) {
        int count = 1;
        while (true) {
            String finalPlayerName = playerName;
            boolean isNotTaken = players.stream()
                    .noneMatch(player -> player.getName().equals(finalPlayerName));
            if (isNotTaken) {
                if (count > 1) {
                    playerName += " (" + count + ")";
                }
                return new Player(playerId, playerName, getAvailableColor(players), new Deck(new ArrayList<>(), new ArrayList<>()), true);
            }
            count++;
        }
    }

    private PlayerColor getAvailableColor(List<Player> players) {
        for (PlayerColor color : PlayerColor.values()) {
            boolean isNotTaken = players.stream()
                    .noneMatch(player -> color.equals(player.getColor()));
            if (isNotTaken) {
                return color;
            }
        }
        throw new NotImplementedException("PlayerFactory.getAvailableColor"); // if no colors are available (too many players)
    }
}