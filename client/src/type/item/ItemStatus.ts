export enum ItemStatus {
  ACTIVE_IN_CURRENT_DECK = "ACTIVE_IN_CURRENT_DECK", // All items placed in the current deck
  MOVING_IN_CURRENT_DECK = "MOVING_IN_CURRENT_DECK", // All items moving in the current deck
  BOARD = "BOARD", // Cards being dragged and cursor in the board for tokens
  UNUSED = "UNUSED", // Cards in stack, token in deck
  USED = "USED", // Voided cards and tokens
}