package interfaces.http.room;

import interfaces.dto.responseDto.EventResponse;
import interfaces.filter.auth.AuthContext;
import interfaces.http.room.connectRoom.ConnectRoomHandler;
import interfaces.http.room.connectRoom.dto.ConnectRoomRequest;
import interfaces.http.room.joinRoom.JoinRoomHandler;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;
import interfaces.http.room.createRoom.CreateRoomHandler;
import interfaces.http.room.startGame.StartGameHandler;
import jakarta.ws.rs.*;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

@Path("/api/games/{gameId}/")
public class RoomResource {

    private final CreateRoomHandler createRoomHandler;
    private final ConnectRoomHandler connectRoomHandler;
    private final JoinRoomHandler joinRoomHandler;
    private final StartGameHandler startGameHandler;

    public RoomResource(
            CreateRoomHandler createRoomHandler,
            ConnectRoomHandler connectRoomHandler,
            JoinRoomHandler joinRoomHandler,
            StartGameHandler startGameHandler) {
        this.createRoomHandler = createRoomHandler;
        this.connectRoomHandler = connectRoomHandler;
        this.joinRoomHandler = joinRoomHandler;
        this.startGameHandler = startGameHandler;
    }

    @POST
    @Path("create")
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse createRoom() {
        System.out.println("Create room request received");

        return createRoomHandler.handleEvent();
    }

    @POST
    @Path("connect")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse connectRoom(
            ConnectRoomRequest connectRoomRequest,
            @PathParam("gameId") String gameId) {
        System.out.println("Connect room for gameId: " + gameId + " by playerId: " + connectRoomRequest.playerId());

        return connectRoomHandler.handleEvent(gameId, connectRoomRequest.playerId());
    }

    @POST
    @Path("join")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse joinRoom(
            JoinRoomRequest joinRoomRequest,
            @PathParam("gameId") String gameId) {
        System.out.println("Join room for gameId: " + gameId + " by playerId: " + joinRoomRequest.playerId());

        return joinRoomHandler.handleEvent(gameId, joinRoomRequest.playerId(), joinRoomRequest);
    }

    @POST
    @Path("start")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public EventResponse startGame(@Context ContainerRequestContext requestContext) {
        String gameId = AuthContext.getGameId(requestContext);
        String playerId = AuthContext.getPlayerId(requestContext);

        System.out.println("Start game for gameId: " + gameId + " by playerId: " + playerId);

        return startGameHandler.handleEvent(gameId, playerId);
    }
}
