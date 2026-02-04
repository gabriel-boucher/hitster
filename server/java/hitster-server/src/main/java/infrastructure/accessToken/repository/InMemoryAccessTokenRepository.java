package infrastructure.accessToken.repository;

import domain.spotify.accessToken.AccessCode;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenId;
import domain.spotify.accessToken.AccessTokenRepository;

public class InMemoryAccessTokenRepository implements AccessTokenRepository {
    private static final AccessTokenId AN_ACCESS_TOKEN_ID = new AccessTokenId("in-memory-access-token-id");
    private static final int AN_EXPIRES_IN_SECONDS = 3600;
    private static final AccessTokenId A_REFRESH_TOKEN_ID = new AccessTokenId("in-memory-refresh-token-id");

    @Override
    public AccessToken getAccessTokenByAccessCode(AccessCode accessCode) {
        return new AccessToken(
                AN_ACCESS_TOKEN_ID,
                AN_EXPIRES_IN_SECONDS,
                A_REFRESH_TOKEN_ID
        );
    }

    @Override
    public AccessToken getAccessTokenByRefreshId(AccessTokenId refreshId) {
        return new AccessToken(
                AN_ACCESS_TOKEN_ID,
                AN_EXPIRES_IN_SECONDS,
                A_REFRESH_TOKEN_ID
        );
    }
}
