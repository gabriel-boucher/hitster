package infrastructure.persistence.mapper;

import domain.deck.Deck;
import domain.deck.item.ItemStatus;
import domain.deck.item.card.Card;
import domain.deck.item.card.CardId;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;
import domain.player.Player;
import domain.player.PlayerColor;
import domain.player.PlayerId;
import infrastructure.persistence.dto.CardPersistenceDto;
import infrastructure.persistence.dto.PlayerPersistenceDto;
import infrastructure.persistence.dto.TokenPersistenceDto;

import java.util.stream.Collectors;

public class PlayerPersistenceMapper {
    private final CardPersistenceMapper cardMapper;
    private final TokenPersistenceMapper tokenMapper;

    public PlayerPersistenceMapper(CardPersistenceMapper cardMapper, TokenPersistenceMapper tokenMapper) {
        this.cardMapper = cardMapper;
        this.tokenMapper = tokenMapper;
    }

    public Player toDomain(PlayerPersistenceDto playerPersistenceDto) {
        return new Player(
                PlayerId.fromString(playerPersistenceDto.id()),
                playerPersistenceDto.name(),
                PlayerColor.valueOf(playerPersistenceDto.color()),
                new Deck(
                        playerPersistenceDto.cards().stream().map(cardMapper::toDomain).collect(Collectors.toList()),
                        playerPersistenceDto.tokens().stream().map(tokenMapper::toDomain).collect(Collectors.toList())
                )
        );
    }

    public PlayerPersistenceDto toDto(Player player) {
        return new PlayerPersistenceDto(
                player.getId().toString(),
                player.getName(),
                player.getColor().name(),
                player.getDeck().getCards().stream().map(cardMapper::toDto).collect(Collectors.toList()),
                player.getDeck().getTokens().stream().map(tokenMapper::toDto).collect(Collectors.toList())
        );
    }
}
