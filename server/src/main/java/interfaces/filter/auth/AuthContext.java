package interfaces.filter.auth;

import jakarta.ws.rs.container.ContainerRequestContext;

public class AuthContext {
    public static String getPlayerId(ContainerRequestContext ctx) {
        return (String) ctx.getProperty(AuthFilter.PLAYER_ID_PROPERTY);
    }

    public static String getGameId(ContainerRequestContext ctx) {
        return (String) ctx.getProperty(AuthFilter.GAME_ID_PROPERTY);
    }
}