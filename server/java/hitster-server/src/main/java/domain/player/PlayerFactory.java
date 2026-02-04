package domain.player;

import interfaces.exception.NotImplementedException;

import java.util.ArrayList;
import java.util.List;

public class PlayerFactory {
    public Player create(PlayerId playerId, List <Player> players) {
        int count = players.size();
        while (true) {
            final String playerName = "Player " + (count + 1);
            final boolean nameExists = players.stream()
                    .anyMatch(player -> player.getName().equals(playerName));
            if (!nameExists) {
                return new Player(playerId, playerName, getAvailableColor(players), new PlayerDeck(new ArrayList<>(), new ArrayList<>()));
            }
            count++;
        }
    }

    public PlayerColor getAvailableColor(List<Player> players) {
        for (PlayerColor color : PlayerColor.values()) {
            boolean isTaken = players.stream()
                    .anyMatch(player -> color.equals(player.getColor()));
            if (!isTaken) {
                return color;
            }
        }
        throw new NotImplementedException("PlayerFactory.getAvailableColor"); // or throw an exception if no colors are available
    }
}