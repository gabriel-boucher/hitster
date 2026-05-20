import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
    useCallback,
} from "react";
import {MovementState} from "./MovementState.ts";
import {MovementAction} from "./MovementAction.ts";
import {movementDefaultDispatch, movementInitialState} from "./MovementInitialState.ts";
import {movementReducerCases} from "./MovementReducerCases.ts";

const MovementStateContext = createContext<[MovementState, Dispatch<MovementAction>]>([
    movementInitialState,
    movementDefaultDispatch,
]);

interface MovementStateProviderProps {
    children: ReactNode;
    initialState: MovementState;
    reducer: (state: MovementState, action: MovementAction) => MovementState;
}

export const MovementStateProvider = ({children, initialState, reducer}: MovementStateProviderProps) => (
    <MovementStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </MovementStateContext.Provider>
);

export const useMovementStateProvider = (): [MovementState, Dispatch<MovementAction>] =>
    useContext(MovementStateContext);

export const useResetMovementState = () => {
    const [, dispatch] = useMovementStateProvider();
    return useCallback(() => {
        dispatch({ type: movementReducerCases.RESET });
    }, [dispatch]);
};
