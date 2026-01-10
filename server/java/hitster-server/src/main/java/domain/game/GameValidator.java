package domain.game;

import domain.exception.InvalidGameStatusException;
import domain.game.exception.InvalidPlayerTurnException;
import domain.player.Player;
import domain.player.PlayerValidator;

public class GameValidator {
    public void validateCanGoNextTurn(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanAddCurrentCardToCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanReorderCurrentCardInCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanRemoveCurrentCardFromCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanAddTokenToCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validateNotPlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanRemoveTokenFromCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validateNotPlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateGameStatus(GameStatus current, GameStatus expected) {
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