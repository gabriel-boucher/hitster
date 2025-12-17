package interfaces.dto;

public record TokenDto(
        String id,
        String status,
        String ownerId
) implements MoveableDto {
}
