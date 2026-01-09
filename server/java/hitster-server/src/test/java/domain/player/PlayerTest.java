package domain.player;

import domain.game.item.card.Card;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;
import domain.game.item.card.CardBuilder;
import domain.game.item.token.TokenBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class PlayerTest {
    private final static PlayerId A_PLAYER_ID = new PlayerId("player-1");
    private final static TokenId A_TOKEN_ID = new TokenId(UUID.randomUUID());

    @Mock
    private PlayerDeck playerDeck;

    private final CardBuilder cardBuilder = new CardBuilder();
    private final TokenBuilder tokenBuilder = new TokenBuilder();

    private Player player;
    private Card card;
    private Token token;

    @BeforeEach
    public void setUp() {
        player = new Player(A_PLAYER_ID, playerDeck);
        card = cardBuilder.build();
        token = tokenBuilder
                .withId(A_TOKEN_ID)
                .build();
    }

    @Test
    public void whenGetId_thenReturnId() {
        assertEquals(A_PLAYER_ID, player.getId());
    }

    @Test
    public void whenGetDeck_thenReturnDeck() {
        assertEquals(playerDeck, player.getDeck());
    }

    @Test
    public void whenGetTokenById_thenReturnTokenFromDeck() {
        willReturn(token).given(playerDeck).getTokenById(A_TOKEN_ID);

        Token retrievedToken = player.getTokenById(A_TOKEN_ID);

        assertEquals(token, retrievedToken);
    }

    @Test
    public void whenAddCurrentCardToDeckAndSetInactive_thenVerifyCallToPlayerDeck() {
        player.addCurrentCardToDeckAndSetInactive(card);

        verify(playerDeck).addCurrentCardAndSetInactive(card);
    }

    @Test
    public void whenAddCardToDeck_thenVerifyCallToPlayerDeck() {
        player.addCardToDeck(card);

        verify(playerDeck).addCard(card);
    }

    @Test
    public void whenAddTokenToDeck_thenVerifyCallToPlayerDeck() {
        player.addTokenToDeck(token);

        verify(playerDeck).addToken(token);
    }
}