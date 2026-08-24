package infrastructure.persistence.inMemory.player.dao;

import infrastructure.persistence.dao.CardDao;
import infrastructure.persistence.dao.PlayerDao;
import infrastructure.persistence.dao.TokenDao;
import infrastructure.persistence.dto.PlayerPersistenceDto;
import infrastructure.persistence.inMemory.player.dto.PlayerInMemoryDto;

import java.util.*;
import java.util.stream.Collectors;

public class PlayerInMemoryDao implements PlayerDao {
    private final Map<String, List<PlayerInMemoryDto>> players;

    private final CardDao cardDao;
    private final TokenDao tokenDao;

    public PlayerInMemoryDao(Map<String, List<PlayerInMemoryDto>> players, CardDao cardDao, TokenDao tokenDao) {
        this.players = players;
        this.cardDao = cardDao;
        this.tokenDao = tokenDao;
    }

    @Override
    public List<PlayerPersistenceDto> getPlayersByGameId(String gameId) {
        List<PlayerInMemoryDto> playersDto = players.getOrDefault(gameId, Collections.emptyList());

        return playersDto.stream().map(p -> new PlayerPersistenceDto(
                p.id(),
                p.name(),
                p.color(),
                cardDao.getCardsByGameIdAndPlayerId(gameId, p.id()),
                tokenDao.getTokensByGameIdAndPlayerId(gameId, p.id())
        )).collect(Collectors.toList());
    }

    @Override
    public void saveByGameId(String gameId, List<PlayerPersistenceDto> players) {
        List<PlayerInMemoryDto> playersDto = players.stream().map(p -> {
            cardDao.saveByGameIdAndPlayerId(gameId, p.id(), p.cards());
            tokenDao.saveByGameIdAndPlayerId(gameId, p.id(), p.tokens());
            return new PlayerInMemoryDto(
                p.id(),
                p.name(),
                p.color()
            );
        }).collect(Collectors.toList());

        this.players.put(gameId, playersDto);
    }
}
