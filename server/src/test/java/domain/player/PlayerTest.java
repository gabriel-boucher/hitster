package domain.player;

import domain.deck.Deck;
import domain.deck.item.card.Card;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;
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
    private final static PlayerId A_PLAYER_ID = new PlayerId(UUID.randomUUID());
    private final static TokenId A_TOKEN_ID = new TokenId(UUID.randomUUID());

    @Mock
    private Deck deck;

    private final PlayerBuilder playerBuilder = new PlayerBuilder();
    private final CardBuilder cardBuilder = new CardBuilder();
    private final TokenBuilder tokenBuilder = new TokenBuilder();

    private Player player;
    private Card card;
    private Token token;

    @BeforeEach
    public void setUp() {
        player = playerBuilder
                .withPlayerId(A_PLAYER_ID)
                .withDeck(deck)
                .build();
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
        assertEquals(deck, player.getDeck());
    }

    @Test
    public void whenGetTokenById_thenReturnTokenFromDeck() {
        willReturn(token).given(deck).getTokenById(A_TOKEN_ID);

        Token retrievedToken = player.getTokenById(A_TOKEN_ID);

        assertEquals(token, retrievedToken);
    }

    @Test
    public void whenAddCurrentCardToDeckAndSetInactive_thenVerifyCallToPlayerDeck() {
        player.addCurrentCardToDeckAndSetUsed(card);

        verify(deck).addCurrentCardAndSetUsed(card);
    }

    @Test
    public void whenAddTokenToDeck_thenVerifyCallToPlayerDeck() {
        player.addTokenToDeck(token);

        verify(deck).addToken(token);
    }
}