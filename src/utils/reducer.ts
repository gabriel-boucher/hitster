import { Action, PlayerInterface, CardInterface, State } from "./Interfaces";
import { cardsFetched, playersFetched, reducerCases } from "./Constants";
import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

const cardsInfo: CardInterface[] = cardsFetched.map((card) => ({
  ...card,
  id: uuidv4(),
  hidden: true,
}));

export const playersInfo: Record<string, PlayerInterface> = playersFetched.reduce(
  (acc, player) => {
    const startingCard = cardsInfo.pop()!;
    startingCard.hidden = false;
    
    acc[player.socketId] = {
      socketId: player.socketId,
      name: player.name,
      cards: [startingCard],
      tokens: [{ id: uuidv4() }, { id: uuidv4() }],
    };
    return acc;
  },
  {} as Record<string, PlayerInterface>
);

export const initialState = {
  spotifyToken: "",
  players: playersInfo,
  activePlayer: "socketId1",
  gapIndex: null,
  cards: cardsInfo,
  activeCard: cardsInfo[cardsInfo.length - 1],
};

export const defaultDispatch: Dispatch<Action> = () => {};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerCases.SET_SPOTIFY_TOKEN: {
      return {
        ...state,
        spotifyToken: action.spotifyToken,
      };
    }
    case reducerCases.SET_PLAYERS: {
      return {
        ...state,
        players: action.players,
      };
    }
    case reducerCases.SET_ACTIVE_PLAYER: {
      return {
        ...state,
        activePlayer: action.activePlayer,
      };
    }
    case reducerCases.SET_CARDS: {
      return {
        ...state,
        cards: action.cards,
      };
    }
    case reducerCases.SET_ACTIVE_CARD: {
      return {
        ...state,
        activeCard: action.activeCard,
      };
    }
    case reducerCases.SET_GAP_INDEX: {
      return {
        ...state,
        gapIndex: action.gapIndex,
      };
    }
    default:
      return state;
  }
};
