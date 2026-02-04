import {movementReducerCases} from "./MovementReducerCases.ts";
import {MovementAction} from "./MovementAction.ts";
import {MovementState} from "./MovementState.ts";

export const movementReducer = (state: MovementState, action: MovementAction) => {
    switch (action.type) {
        case movementReducerCases.SET_IS_DRAGGING: {
            return {
                ...state,
                isDragging: action.isDragging,
            };
        }
        case movementReducerCases.SET_CURRENT_CARD_WIDTH: {
            return {
                ...state,
                currentCardWidth: action.currentCardWidth,
            };
        }
        case movementReducerCases.SET_DRAGGING_POSITION: {
            return {
                ...state,
                draggingPosition: action.draggingPosition,
            };
        }
        default:
            return state;
    }
};