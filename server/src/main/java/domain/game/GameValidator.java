package domain.game;

import domain.exception.InvalidGameStatusException;
import domain.game.exception.InvalidPlayerTurnException;
import domain.game.item.token.Token;
import domain.player.Player;

public class GameValidator {
    public void validateCanGoNextTurn(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanAddCurrentCardToCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanRemoveCurrentCardFromCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanReturnCurrentCardToPile(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanMoveCurrentCardInCurrentDeck(Player requestingPlayer, Player currentPlayer, GameStatus currentStatus) {
        validatePlayerTurn(requestingPlayer, currentPlayer);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanAddTokenToCurrentDeck(Player requestingPlayer, Player currentPlayer, Token token, GameStatus currentStatus) {
        validateNotPlayerTurn(requestingPlayer, currentPlayer);
        validatePlayerToken(requestingPlayer, token);
        validateGameStatus(currentStatus, GameStatus.PLAYING);
    }

    public void validateCanRemoveTokenFromCurrentDeck(Player requestingPlayer, Player currentPlayer, Token token, GameStatus currentStatus) {
        validateNotPlayerTurn(requestingPlayer, currentPlayer);
        validatePlayerToken(requestingPlayer, token);
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

    private void validatePlayerToken(Player currentPlayer, Token token) {
        if (!token.getOwnerId().equals(currentPlayer.getId())) {
            throw new InvalidPlayerTurnException(currentPlayer.getId());
        }
    }
}