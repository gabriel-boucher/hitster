package interfaces.mapper;

import domain.game.item.token.Token;
import interfaces.dto.TokenDto;

public class TokenMapper {
    public TokenDto toDto(Token token) {
        return new TokenDto(
                token.getId().toString(),
                "token",
                token.getStatus().name(),
                token.getOwnerId().toString()
        );
    }
}
