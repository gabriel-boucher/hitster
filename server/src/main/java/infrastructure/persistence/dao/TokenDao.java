package infrastructure.persistence.dao;

import infrastructure.persistence.dto.TokenPersistenceDto;

import java.util.List;
import java.util.Optional;

public interface TokenDao {
    Optional<TokenPersistenceDto> getTokenByGameIdAndPlayerIdAndTokenId(String gameId, String playerId, String tokenId);
    List<TokenPersistenceDto> getTokensByGameIdAndPlayerId(String gameId, String playerId);
    void saveByGameIdAndPlayerIdAndTokenId(String gameId, String playerId, String tokenId, TokenPersistenceDto token);
    void saveByGameIdAndPlayerId(String gameId, String playerId, List<TokenPersistenceDto> tokens);
    void deleteByGameId(String gameId);
}
