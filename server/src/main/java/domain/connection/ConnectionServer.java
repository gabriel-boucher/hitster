package domain.connection;

import domain.game.Game;
import domain.player.PlayerId;
import domain.room.Room;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;

public interface ConnectionServer {
    void setup(RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper);

    void start();

    void stop();

    void joinRoom(Connection connection);

    void leaveRoom(Connection connection);

    void broadcastRoomState(Room room);

    void broadcastRoomStateExceptPlayer(Room room, PlayerId excludedPlayerId);

    void broadcastGameState(Game game);

    void broadcastGameStateExceptPlayer(Game game, PlayerId excludedPlayerId);
}
