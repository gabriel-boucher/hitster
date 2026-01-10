package interfaces.mapper;

import domain.player.Player;
import interfaces.dto.PlayerDto;

public class PlayerMapper {
    private final PlayerDeckMapper playerDeckMapper;

    public PlayerMapper(PlayerDeckMapper playerDeckMapper) {
        this.playerDeckMapper = playerDeckMapper;
    }

    public PlayerDto toDto(Player player) {
        return new PlayerDto(
                player.getId().toString(),
                player.getName(),
                player.getColor().toString(),
                playerDeckMapper.toDto(player.getDeck())
        );
    }
}
