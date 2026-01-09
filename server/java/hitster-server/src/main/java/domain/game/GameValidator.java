package domain.game;

import domain.exception.InvalidGameStatusException;
import domain.game.exception.InvalidPlayerTurnException;
import domain.player.Player;

public class GameValidator {

    public void validateCanStartGame(GameStatus currentStatus, Player requestingPlayer, Player currentPlayer) {
        validateGameStatus(currentStatus, GameStatus.LOBBY);
        validatePlayerTurn(requestingPlayer, currentPlayer);
    }

    public void validateIsPlayerTurn(GameStatus currentStatus, Player requestingPlayer, Player currentPlayer) {
        validateGameStatus(currentStatus, GameStatus.PLAYING);
        validatePlayerTurn(requestingPlayer, currentPlayer);
    }

    public void validateIsNotPlayerTurn(GameStatus currentStatus, Player requestingPlayer, Player currentPlayer) {
        validateGameStatus(currentStatus, GameStatus.PLAYING);
        validateNotPlayerTurn(requestingPlayer, currentPlayer);
    }

    private void validateGameStatus(GameStatus current, GameStatus expected) {
        if (current != expected) {
            throw new InvalidGameStatusException(expected);
        }
    }

    private void validatePlayerTurn(Player requestingPlayer, Player currentPlayer) {
        if (!currentPlayer.equals(requestingPlayer)) {
            throw new InvalidPlayerTurnException(requestingPlayer.getId());
        }
    }

    private void validateNotPlayerTurn(Player requestingPlayer, Player currentPlayer) {
        if (currentPlayer.equals(requestingPlayer)) {
            throw new InvalidPlayerTurnException(requestingPlayer.getId());
        }
    }
}