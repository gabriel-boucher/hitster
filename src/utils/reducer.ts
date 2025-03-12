import { Action, CardInterface, PlayerInterface, State } from "./Interfaces";
import { cardsFetched, playersFetched, reducerCases } from "./Constants";
import { Dispatch } from "react";

const cardsInfo: CardInterface[] = cardsFetched.map((card, index) => ({
  ...card,
  id: index.toString(),
  inHand: false,
  hidden: true,
}));

const playersInfo = new Map<string, PlayerInterface>(
  playersFetched.map((player) => [
    player.socketId,
    {
      ...player,
      cards: [{ ...cardsInfo.pop()!, inHand: true, hidden: false }],
      tokens: 2,
    },
  ])
);

export const initialState = {
  socketId: "socketId1",
  spotifyToken: "",
  players: playersInfo,
  playersTurn: 0,
  playerCards: playersInfo.get("socketId1")!.cards,
  openedGapIndex: null,
  cards: cardsInfo,
  activeCard: cardsInfo[cardsInfo.length - 1],
};

export const defaultDispatch: Dispatch<Action> = () => {};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerCases.SET_SOCKET_ID: {
      return {
        ...state,
        socketId: action.socketId,
      };
    }
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
    case reducerCases.SET_PLAYERS_TURN: {
      return {
        ...state,
        playersTurn: action.playersTurn,
      };
    }
    case reducerCases.SET_PLAYER_CARDS: {
      return {
        ...state,
        playerCards: action.playerCards,
      };
    }
    case reducerCases.SET_OPENED_GAP_INDEX: {
      return {
        ...state,
        openedGapIndex: action.openedGapIndex,
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
    default:
      return state;
  }
};
