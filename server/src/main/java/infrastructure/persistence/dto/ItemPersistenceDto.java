package infrastructure.persistence.dto;

public sealed interface ItemPersistenceDto permits CardPersistenceDto, TokenPersistenceDto {
}
