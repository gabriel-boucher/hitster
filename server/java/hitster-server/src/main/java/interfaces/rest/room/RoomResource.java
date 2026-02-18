package interfaces.rest.room;

import interfaces.dto.responseDto.EventResponse;
import interfaces.rest.room.changePlayerColor.ChangePlayerColorHandler;
import interfaces.rest.room.changePlayerName.ChangePlayerNameHandler;
import interfaces.rest.room.createRoom.CreateRoomHandler;
import interfaces.rest.room.removePlayer.RemovePlayerHandler;
import interfaces.rest.room.startGame.StartGameHandler;
import interfaces.rest.room.startGame.dto.StartGameRequest;
import interfaces.rest.room.changePlayerColor.dto.ChangePlayerColorRequest;
import interfaces.rest.room.changePlayerName.dto.ChangePlayerNameRequest;
import interfaces.rest.room.createRoom.dto.CreateRoomRequest;
import interfaces.rest.room.removePlayer.dto.RemovePlayerRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/api/room/")
public class RoomResource {
    private final CreateRoomHandler createRoomHandler;
    private final ChangePlayerNameHandler changePlayerNameHandler;
    private final ChangePlayerColorHandler changePlayerColorHandler;
    private final RemovePlayerHandler removePlayerHandler;
    private final StartGameHandler startGameHandler;

    public RoomResource(
            CreateRoomHandler createRoomHandler,
            ChangePlayerNameHandler changePlayerNameHandler,
            ChangePlayerColorHandler changePlayerColorHandler,
            RemovePlayerHandler removePlayerHandler,
            StartGameHandler startGameHandler) {
        this.createRoomHandler = createRoomHandler;
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

    @PUT
    @Path("change-player-name")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse changePlayerName(ChangePlayerNameRequest changePlayerNameRequest) {
        System.out.println("Change player name for roomId: " + changePlayerNameRequest.roomId() + " by playerId: " + changePlayerNameRequest.playerId());

        return changePlayerNameHandler.handleEvent(changePlayerNameRequest);
    }

    @PUT
    @Path("change-player-color")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse changePlayerColor(ChangePlayerColorRequest changePlayerColorRequest) {
        System.out.println("Change player color for roomId: " + changePlayerColorRequest.roomId() + " by playerId: " + changePlayerColorRequest.playerId());

        return changePlayerColorHandler.handleEvent(changePlayerColorRequest);
    }

    @DELETE
    @Path("remove-player/{playerToRemoveId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse removePlayer(
            @HeaderParam("x-room-id") String roomId,
            @HeaderParam("x-player-id") String playerId,
            @PathParam("playerToRemoveId") String playerToRemoveId) {
        System.out.println("Remove player for roomId: " + roomId + " by playerId: " + playerId);
        RemovePlayerRequest removePlayerRequest = new RemovePlayerRequest(roomId, playerId, playerToRemoveId);

        return removePlayerHandler.handleEvent(removePlayerRequest);
    }

    @POST
    @Path("start-game")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse startGame(StartGameRequest startGameRequest) {
        System.out.println("Start game for roomId: " + startGameRequest.roomId() + " by playerId: " + startGameRequest.playerId());

        return startGameHandler.handleEvent(startGameRequest);
    }
}
