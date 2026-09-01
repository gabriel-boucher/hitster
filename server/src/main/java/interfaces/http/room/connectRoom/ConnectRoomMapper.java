package interfaces.http.room.connectRoom;

import domain.game.GameId;
import domain.player.Player;
import interfaces.http.room.connectRoom.dto.ConnectRoomData;
import interfaces.http.room.connectRoom.dto.ConnectRoomResponse;

import java.util.ArrayList;
import java.util.List;

public class ConnectRoomMapper {
    public ConnectRoomData toDomain(String gameId) {
        return new ConnectRoomData(GameId.fromString(gameId));
    }

    public ConnectRoomResponse toDto(String playerId, List<Player> players) {
        List<String> playerNames = new ArrayList<>();
        String playerName = "";
        for (Player player : players) {
            playerNames.add(player.getName());
            if (player.getId().toString().equals(playerId)) {
                playerName = player.getName();
            }
        }
        return new ConnectRoomResponse(playerName, playerNames);
    }
}
