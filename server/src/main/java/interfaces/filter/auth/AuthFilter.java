package interfaces.filter.auth;

import interfaces.exception.UnauthorizedException;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthFilter implements ContainerRequestFilter {

    public static final String PLAYER_ID_PROPERTY = "playerId";
    public static final String GAME_ID_PROPERTY = "gameId";

    private final BearerTokenProvider tokenProvider = new BearerTokenProvider();

    @Override
    public void filter(ContainerRequestContext requestContext) {
        if (requestContext.getMethod().equalsIgnoreCase("OPTIONS")) {
            return;
        }

        String path = requestContext.getUriInfo().getPath();
        if ((path.endsWith("/create") || path.endsWith("/connect")) || path.endsWith("/join") && requestContext.getMethod().equals("POST")) {
            return;
        }

        String authHeader = requestContext.getHeaderString("Authorization");
        DecodedToken decoded = tokenProvider.decode(authHeader);

        String gameId = requestContext.getUriInfo()
                .getPathParameters()
                .getFirst("gameId");

        if (gameId == null || !gameId.equals(decoded.gameId())) {
            throw new UnauthorizedException("Token not valid for this game");
        }

        requestContext.setProperty(PLAYER_ID_PROPERTY, decoded.playerId());
        requestContext.setProperty(GAME_ID_PROPERTY, decoded.gameId());
    }
}