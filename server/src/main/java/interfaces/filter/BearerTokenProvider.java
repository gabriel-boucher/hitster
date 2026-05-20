package interfaces.filter;

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

    public String generate(PlayerId playerId) {
        return Jwts.builder()
                .subject(playerId.toString())
                .signWith(secretKey)
                .compact();
    }

    public PlayerId decode(String bearerToken) {
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new UnauthorizedException("Missing bearer token");
        }

        String token = bearerToken.startsWith("Bearer ")
                ? bearerToken.substring(7)
                : bearerToken;

        try {
            String subject = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();

            return PlayerId.fromString(subject);
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid bearer token: " + e.getMessage());
        }
    }
}

