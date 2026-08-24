package domain.deck.item;

public enum ItemStatus {
    ACTIVE_IN_CURRENT_DECK, // Cards + Tokens: placed in the current deck
    MOVING_IN_CURRENT_DECK, // Cards + Tokens: moving in the current deck
    BOARD,                  // Cards: dragged       Tokens: cursor in the board
    UNUSED,                 // Cards: in stack      Tokens: in deck
    USED                    // Cards + Tokens: voided
}
