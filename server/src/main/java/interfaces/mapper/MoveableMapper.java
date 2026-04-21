package interfaces.mapper;

import domain.game.item.Moveable;
import domain.game.item.card.Card;
import domain.game.item.token.Token;
import interfaces.dto.MoveableDto;

public class MoveableMapper {
    private final CardMapper cardMapper;
    private final TokenMapper tokenMapper;

    public MoveableMapper(CardMapper cardMapper, TokenMapper tokenMapper) {
        this.cardMapper = cardMapper;
        this.tokenMapper = tokenMapper;
    }

    public MoveableDto toDto(Moveable moveable) {
        if (moveable instanceof Card card) {
            return cardMapper.toDto(card);
        } else if (moveable instanceof Token token) {
            return tokenMapper.toDto(token);
        }
        return null;
    }
}
