package domain.player;

import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.card.CardId;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;
import domain.game.item.card.CardBuilder;
import domain.game.item.token.TokenBuilder;
import domain.player.exception.TokenNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class PlayerDeckTest {
    private final static UUID A_UUID = UUID.randomUUID();
    private final static CardId A_CARD_ID = new CardId("card-1");
    private final static CardId ANOTHER_CARD_ID = new CardId("card-2");
    private final static TokenId A_TOKEN_ID = new TokenId(A_UUID);
    private final static int A_SMALLER_DATE = 1950;
    private final static int A_GREATER_DATE = 1960;

    private final PlayerDeckBuilder playerDeckBuilder = new PlayerDeckBuilder();
    private final CardBuilder cardBuilder = new CardBuilder();
    private final TokenBuilder tokenBuilder = new TokenBuilder();

    private PlayerDeck playerDeck;
    private Card card;
    private Token token;

    @BeforeEach
    public void setUp() {
        card = cardBuilder
                .withId(A_CARD_ID)
                .build();
        token = tokenBuilder
                .withId(A_TOKEN_ID)
                .build();
        playerDeck = playerDeckBuilder.build();
    }

    @Test
    public void whenGetCards_thenReturnCards() {
        playerDeck = playerDeckBuilder
                .withCard(card)
                .build();

        List<Card> cards = playerDeck.getCards();

        assertEquals(1, cards.size());
        assertEquals(card, cards.getFirst());
    }

    @Test
    public void whenGetTokens_thenReturnTokens() {
        playerDeck = playerDeckBuilder
                .withToken(token)
                .build();

        List<Token> tokens = playerDeck.getTokens();

        assertEquals(1, tokens.size());
        assertEquals(token, tokens.getFirst());
    }

    @Test
    public void givenValidTokenId_whenGetTokenById_thenReturnToken() {
        playerDeck = playerDeckBuilder
                .withToken(token)
                .build();

        Token foundToken = playerDeck.getTokenById(A_TOKEN_ID);

        assertEquals(token, foundToken);
    }

    @Test
    public void givenInvalidTokenId_whenGetTokenById_thenThrowTokenNotFoundException() {
        assertThrows(
                TokenNotFoundException.class,
                () -> playerDeck.getTokenById(A_TOKEN_ID)
        );
    }

    @Test
    public void whenAddCard_thenCardIsAdded() {
        playerDeck.addCard(card);

        assertEquals(1, playerDeck.getCards().size());
        assertEquals(card, playerDeck.getCards().getLast());
    }

    @Test
    public void whenAddToken_thenTokenIsAdded() {
        playerDeck.addToken(token);

        assertEquals(1, playerDeck.getTokens().size());
        assertEquals(token, playerDeck.getTokens().getLast());
    }

    @Test
    public void givenCurrentCardDateSmallerThenCardInDeck_whenAddCurrentCardAndSetInactive_thenCurrentCardIsAddedBeforeCardInDeck() {
        Card cardInDeck = cardBuilder
                .withId(A_CARD_ID)
                .withDate(A_GREATER_DATE)
                .build();
        Card currentCard = cardBuilder
                .withId(ANOTHER_CARD_ID)
                .withDate(A_SMALLER_DATE)
                .build();

        playerDeck = playerDeckBuilder
                .withCard(cardInDeck)
                .build();

        playerDeck.addCurrentCardAndSetInactive(currentCard);

        assertEquals(currentCard, playerDeck.getCards().getFirst());
    }

    @Test
    public void givenCurrentCardDateGreaterThenCardInDeck_whenAddCurrentCardAndSetInactive_thenCurrentCardIsAddedAfterCardInDeck() {
        Card cardInDeck = cardBuilder
                .withId(A_CARD_ID)
                .withDate(A_SMALLER_DATE)
                .build();
        Card currentCard = cardBuilder
                .withId(ANOTHER_CARD_ID)
                .withDate(A_GREATER_DATE)
                .build();

        playerDeck = playerDeckBuilder
                .withCard(cardInDeck)
                .build();

        playerDeck.addCurrentCardAndSetInactive(currentCard);

        assertEquals(currentCard, playerDeck.getCards().getLast());
    }

    @Test
    public void givenCurrentCardDateEqualToCardInDeck_whenAddCurrentCardAndSetInactive_thenCurrentCardIsAddedBeforeCardInDeck() {
        Card cardInDeck = cardBuilder
                .withId(A_CARD_ID)
                .withDate(A_SMALLER_DATE)
                .build();
        Card currentCard = cardBuilder
                .withId(ANOTHER_CARD_ID)
                .withDate(A_SMALLER_DATE)
                .build();

        playerDeck = playerDeckBuilder
                .withCard(cardInDeck)
                .build();

        playerDeck.addCurrentCardAndSetInactive(currentCard);

        assertEquals(currentCard, playerDeck.getCards().getFirst());
    }

    @Test
    public void whenAddCurrentCardAndSetInactive_thenCurrentCardIsSetToInactive() {
        Card currentCard = cardBuilder
                .withStatus(ItemStatus.ACTIVE)
                .build();

        playerDeck.addCurrentCardAndSetInactive(currentCard);

        assertEquals(ItemStatus.INACTIVE, currentCard.getStatus());
    }
}
