export interface MovementState {
    isDragging: boolean;
    currentCardWidth: number;
    draggingPosition: { x: number; y: number };
}