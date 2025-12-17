package interfaces.dto;

public record CardDto(
        String id,
        String status,
        int date
) implements MoveableDto {
}
