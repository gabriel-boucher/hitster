package domain.spotify.accessToken;

public interface AccessTokenRepository {
    AccessToken getAccessTokenByAccessCode(AccessCode accessCode);
    AccessToken getAccessTokenByRefreshId(AccessTokenId refreshId);
}
