package interfaces.http.player.changePlayerMe.dto;

public record ChangePlayerMeRequest(
        String newName,
        String newColor
) {
}
