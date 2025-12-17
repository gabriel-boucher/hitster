package interfaces.mapper;

import domain.game.deck.PlayerDeck;
import interfaces.dto.PlayerDeckDto;

public class PlayerDeckMapper {
    private final CardMapper cardMapper;
    private final TokenMapper tokenMapper;

    public PlayerDeckMapper(CardMapper cardMapper, TokenMapper tokenMapper) {
        this.cardMapper = cardMapper;
        this.tokenMapper = tokenMapper;
    }

    public PlayerDeckDto toDto(PlayerDeck deck) {
        return new PlayerDeckDto(
                deck.getCards().stream().map(cardMapper::toDto).toList(),
                deck.getTokens().stream().map(tokenMapper::toDto).toList()
        );
    }
}
