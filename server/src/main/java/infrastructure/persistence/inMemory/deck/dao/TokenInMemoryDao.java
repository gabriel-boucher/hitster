package infrastructure.persistence.inMemory.deck.dao;

import infrastructure.persistence.dao.TokenDao;
import infrastructure.persistence.dto.TokenPersistenceDto;

import java.util.*;

public class TokenInMemoryDao implements TokenDao {
    private final Map<String, Map<String, List<TokenPersistenceDto>>> tokens;

    public TokenInMemoryDao(Map<String, Map<String, List<TokenPersistenceDto>>> tokens) {
        this.tokens = tokens;
    }

    @Override
    public Optional<TokenPersistenceDto> getTokenByGameIdAndPlayerIdAndTokenId(String gameId, String playerId, String tokenId) {
        return tokens.getOrDefault(gameId, Collections.emptyMap()).getOrDefault(playerId, Collections.emptyList()).stream()
                .filter(token -> token.id().equals(tokenId))
                .findFirst();
    }

    @Override
    public List<TokenPersistenceDto> getTokensByGameIdAndPlayerId(String gameId, String playerId) {
        return tokens.getOrDefault(gameId, Collections.emptyMap()).getOrDefault(playerId, Collections.emptyList());
    }

    @Override
    public void saveByGameIdAndPlayerIdAndTokenId(String gameId, String playerId, String tokenId, TokenPersistenceDto token) {
        getTokensByGameIdAndPlayerId(gameId, playerId).replaceAll(t -> t.id().equals(tokenId) ? token : t);
    }

    @Override
    public void saveByGameIdAndPlayerId(String gameId, String playerId, List<TokenPersistenceDto> tokens) {
        this.tokens.computeIfAbsent(gameId, k -> new HashMap<>()).put(playerId, tokens);
    }
}
