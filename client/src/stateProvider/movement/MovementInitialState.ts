import {Dispatch} from "react";
import {MovementAction} from "./MovementAction.ts";

export const movementInitialState = {
    isDragging: false,
    currentCardWidth: 100,
    draggingPosition: { x: 0, y: 0 },
};

export const movementDefaultDispatch: Dispatch<MovementAction> = () => {};