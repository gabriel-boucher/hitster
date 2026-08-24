package infrastructure.persistence.mapper;

import domain.deck.item.ItemStatus;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;
import domain.player.PlayerId;
import infrastructure.persistence.dto.TokenPersistenceDto;

public class TokenPersistenceMapper {
    public Token toDomain(TokenPersistenceDto tokenPersistenceDto) {
        return new Token(
                TokenId.fromString(tokenPersistenceDto.id()),
                ItemStatus.valueOf(tokenPersistenceDto.status()),
                PlayerId.fromString(tokenPersistenceDto.ownerId())
        );
    }

    public TokenPersistenceDto toDto(Token token) {
        return new TokenPersistenceDto(
                token.getId().toString(),
                token.getStatus().name(),
                token.getOwnerId().toString()
        );
    }
}
