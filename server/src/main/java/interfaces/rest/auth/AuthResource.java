package interfaces.rest.auth;

import interfaces.dto.responseDto.EventResponse;
import interfaces.rest.auth.inMemoryAuth.AuthInMemoryHandler;
import interfaces.rest.auth.inMemoryAuth.AuthInMemoryRequest;
import interfaces.rest.auth.spotifyAuth.AuthSpotifyHandler;
import interfaces.rest.auth.spotifyAuth.AuthSpotifyRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

@Path("/api/auth/")
public class AuthResource {
    private final AuthInMemoryHandler authInMemoryHandler;
    private final AuthSpotifyHandler authSpotifyHandler;

    public AuthResource(AuthInMemoryHandler authInMemoryHandler, AuthSpotifyHandler authSpotifyHandler) {
        this.authInMemoryHandler = authInMemoryHandler;
        this.authSpotifyHandler = authSpotifyHandler;
    }

    @POST
    @Path("in-memory")
    @Consumes(MediaType.APPLICATION_JSON)
    public EventResponse inMemoryAuth(AuthInMemoryRequest authInMemoryRequest) {
        System.out.println("In-memory authorization for roomId: " + authInMemoryRequest.roomId() + " by playerId: " + authInMemoryRequest.playerId());

        return authInMemoryHandler.handleEvent(authInMemoryRequest);
    }

    @POST
    @Path("spotify")
    @Consumes(MediaType.APPLICATION_JSON)
    public EventResponse spotifyAuth(AuthSpotifyRequest authSpotifyRequest) {
        System.out.println("Spotify authorization for roomId: " + authSpotifyRequest.roomId() + " by playerId: " + authSpotifyRequest.playerId() + " with code: " + authSpotifyRequest.spotifyAccessCode());

        return authSpotifyHandler.handleEvent(authSpotifyRequest);
    }
}
