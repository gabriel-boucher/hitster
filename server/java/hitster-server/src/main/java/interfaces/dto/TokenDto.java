package interfaces.dto;

public record TokenDto(
        String id,
        String type,
        String status,
        String ownerId
) implements MoveableDto {
}
