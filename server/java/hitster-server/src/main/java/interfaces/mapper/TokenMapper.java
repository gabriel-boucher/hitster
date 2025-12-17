package interfaces.mapper;

import domain.game.deck.token.Token;
import interfaces.dto.TokenDto;

public class TokenMapper {
    public TokenDto toDto(Token token) {
        return new TokenDto(
                token.getId().toString(),
                token.getStatus().name(),
                token.getOwnerId().toString()
        );
    }
}
