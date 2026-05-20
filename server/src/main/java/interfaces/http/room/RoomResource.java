package interfaces.http.room;

import interfaces.dto.responseDto.EventResponse;
import interfaces.http.room.joinRoom.JoinRoomHandler;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;
import interfaces.http.room.changePlayerColor.ChangePlayerColorHandler;
import interfaces.http.room.changePlayerName.ChangePlayerNameHandler;
import interfaces.http.room.createRoom.CreateRoomHandler;
import interfaces.http.room.removePlayer.RemovePlayerHandler;
import interfaces.http.room.startGame.StartGameHandler;
import interfaces.http.room.startGame.dto.StartGameRequest;
import interfaces.http.room.changePlayerColor.dto.ChangePlayerColorRequest;
import interfaces.http.room.changePlayerName.dto.ChangePlayerNameRequest;
import interfaces.http.room.createRoom.dto.CreateRoomRequest;
import interfaces.http.room.removePlayer.dto.RemovePlayerRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/api/room/")
public class RoomResource {
    private final CreateRoomHandler createRoomHandler;
    private final JoinRoomHandler joinRoomHandler;
    private final ChangePlayerNameHandler changePlayerNameHandler;
    private final ChangePlayerColorHandler changePlayerColorHandler;
    private final RemovePlayerHandler removePlayerHandler;
    private final StartGameHandler startGameHandler;

    public RoomResource(
            CreateRoomHandler createRoomHandler,
            JoinRoomHandler joinRoomHandler,
            ChangePlayerNameHandler changePlayerNameHandler,
            ChangePlayerColorHandler changePlayerColorHandler,
            RemovePlayerHandler removePlayerHandler,
            StartGameHandler startGameHandler) {
        this.createRoomHandler = createRoomHandler;
        this.joinRoomHandler = joinRoomHandler;
        this.changePlayerNameHandler = changePlayerNameHandler;
        this.changePlayerColorHandler = changePlayerColorHandler;
        this.removePlayerHandler = removePlayerHandler;
        this.startGameHandler = startGameHandler;
    }

    @POST
    @Path("create-room")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse createRoom(CreateRoomRequest createRoomRequest) {
        System.out.println("Create room request received");

        return createRoomHandler.handleEvent(createRoomRequest);
    }

    @POST
    @Path("join-room")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse joinRoom(JoinRoomRequest joinRoomRequest) {
        System.out.println("Join room for gameId: " + joinRoomRequest.gameId() + " by playerId: " + joinRoomRequest.playerId());

        return joinRoomHandler.handleEvent(joinRoomRequest);
    }

    @PUT
    @Path("change-player-name")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse changePlayerName(ChangePlayerNameRequest changePlayerNameRequest) {
        System.out.println("Change player name for gameId: " + changePlayerNameRequest.gameId() + " by playerId: " + changePlayerNameRequest.playerId());

        return changePlayerNameHandler.handleEvent(changePlayerNameRequest);
    }

    @PUT
    @Path("change-player-color")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse changePlayerColor(ChangePlayerColorRequest changePlayerColorRequest) {
        System.out.println("Change player color for gameId: " + changePlayerColorRequest.gameId() + " by playerId: " + changePlayerColorRequest.playerId());

        return changePlayerColorHandler.handleEvent(changePlayerColorRequest);
    }

    @DELETE
    @Path("remove-player/{playerToRemoveId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removePlayer(
            @HeaderParam("x-game-id") String gameId,
            @HeaderParam("x-player-id") String playerId,
            @PathParam("playerToRemoveId") String playerToRemoveId) {
        System.out.println("Remove player for gameId: " + gameId + " by playerId: " + playerId);
        RemovePlayerRequest removePlayerRequest = new RemovePlayerRequest(gameId, playerId, playerToRemoveId);

        return removePlayerHandler.handleEvent(removePlayerRequest);
    }

    @POST
    @Path("start-game")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse startGame(StartGameRequest startGameRequest) {
        System.out.println("Start game for gameId: " + startGameRequest.gameId() + " by playerId: " + startGameRequest.playerId());

        return startGameHandler.handleEvent(startGameRequest);
    }
}
