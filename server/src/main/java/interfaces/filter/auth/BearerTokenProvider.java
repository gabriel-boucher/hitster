package interfaces.filter.auth;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.exception.UnauthorizedException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

import static environments.Env.JWT_SECRET;

public class BearerTokenProvider {
    private final SecretKey secretKey;

    public BearerTokenProvider() {
        this.secretKey = Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generate(PlayerId playerId, GameId gameId) {
        return Jwts.builder()
                .subject(playerId.toString())
                .claim("gameId", gameId.toString())
                .signWith(secretKey)
                .compact();
    }

    public DecodedToken decode(String bearerToken) {
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new UnauthorizedException("Missing bearer id");
        }

        String token = bearerToken.startsWith("Bearer ")
                ? bearerToken.substring(7)
                : bearerToken;

        try {
            var claims = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String playerId = claims.getSubject();
            String gameId = claims.get("gameId", String.class);

            return new DecodedToken(playerId, gameId);
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid bearer id: " + e.getMessage());
        }
    }
}

