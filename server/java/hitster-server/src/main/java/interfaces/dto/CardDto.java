package interfaces.dto;

public record CardDto(
        String id,
        String status,
        String name,
        String artist,
        int date,
        String albumUrl
) implements MoveableDto {
}
