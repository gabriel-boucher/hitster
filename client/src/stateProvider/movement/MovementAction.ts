import {movementReducerCases} from "./MovementReducerCases.ts";

export interface SetIsDraggingAction {
    type: movementReducerCases.SET_IS_DRAGGING;
    isDragging: boolean;
}

export interface SetCurrentCardWidthAction {
    type: movementReducerCases.SET_CURRENT_CARD_WIDTH;
    currentCardWidth: number;
}

export interface SetDraggingPositionAction {
    type: movementReducerCases.SET_DRAGGING_POSITION;
    draggingPosition: { x: number; y: number };
}

export type MovementAction =
    | SetIsDraggingAction
    | SetCurrentCardWidthAction
    | SetDraggingPositionAction