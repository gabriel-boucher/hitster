package interfaces.rest.spotify.getAccessToken;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.accessToken.AccessToken;
import interfaces.rest.spotify.getAccessToken.dto.GetAccessTokenData;
import interfaces.rest.spotify.getAccessToken.dto.GetAccessTokenResponse;

public class GetAccessTokenMapper {
    public GetAccessTokenData toDomain(String roomId, String playerId) {
        return new GetAccessTokenData(
                RoomId.fromString(roomId),
                PlayerId.fromString(playerId)
        );
    }

    public GetAccessTokenResponse toDto(AccessToken accessToken) {
        return new GetAccessTokenResponse(accessToken.id().toString());
    }
}
