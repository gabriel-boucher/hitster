package domain.game.item;

public enum ItemStatus {
    ACTIVE_IN_CURRENT_DECK, // All items placed in the current deck
    MOVING_IN_CURRENT_DECK, // All items moving in the current deck
    BOARD, // Cards being dragged and cursor in the board for tokens
    UNUSED, // Cards in stack, token in deck
    USED // Voided cards and tokens
}
