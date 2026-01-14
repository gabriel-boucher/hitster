package domain.player;

import domain.exception.PlayerNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class PlayersTest {
    private final static PlayerId A_PLAYER_ID = new PlayerId(UUID.randomUUID());
    private final static PlayerId ANOTHER_PLAYER_ID = new PlayerId(UUID.randomUUID());

    private final PlayerBuilder playerBuilder = new PlayerBuilder();

    private Player player;
    private int currentPlayerIndex;
    private Players players;

    @BeforeEach
    public void setUp() {
        player = playerBuilder
                .withPlayerId(A_PLAYER_ID)
                .build();
        currentPlayerIndex = 0;
        players = new Players(new ArrayList<>(List.of(player)), currentPlayerIndex);
    }

    @Test
    public void whenGetPlayers_thenReturnPlayersList() {
        List<Player> playersList = players.getPlayers();

        assertEquals(1, playersList.size());
        assertEquals(player, playersList.getFirst());
    }

    @Test
    public void whenGetCurrentPlayerIndex_thenReturnIndex() {
        int index = players.getCurrentPlayerIndex();

        assertEquals(currentPlayerIndex, index);
    }

    @Test
    public void whenGetCurrentPlayer_thenReturnPlayer() {
        Player currentPlayer = players.getCurrentPlayer();

        assertEquals(player, currentPlayer);
    }

    @Test
    public void givenExistingPlayer_whenGetPlayerById_thenReturnPlayer() {
        Player foundPlayer = players.getPlayerById(player.getId());

        assertEquals(player, foundPlayer);
    }

    @Test
    public void givenNonExistingPlayer_whenGetPlayerById_thenThrowPlayerNotFoundException() {
        assertThrows(
                PlayerNotFoundException.class,
                () -> players.getPlayerById(ANOTHER_PLAYER_ID)
        );
    }

    @Test
    public void whenSetCurrentPlayerIndex_thenUpdateIndex() {
        int newIndex = 1;
        players.setCurrentPlayerIndex(newIndex);

        assertEquals(newIndex, players.getCurrentPlayerIndex());
    }

    @Test
    public void whenSetNextPlayer_thenUpdateToNextPlayerIndex() {
        Player anotherPlayer = playerBuilder
                .withPlayerId(ANOTHER_PLAYER_ID)
                .build();
        players = new Players(new ArrayList<>(List.of(player, anotherPlayer)), 0);

        players.setNextPlayer();

        assertEquals(1, players.getCurrentPlayerIndex());
    }

    @Test
    public void givenLastPlayer_whenSetNextPlayer_thenWrapAroundToFirstPlayer() {
        Player anotherPlayer = playerBuilder
                .withPlayerId(ANOTHER_PLAYER_ID)
                .build();
        players = new Players(new ArrayList<>(List.of(player, anotherPlayer)), 1);

        players.setNextPlayer();

        assertEquals(0, players.getCurrentPlayerIndex());
    }
}
