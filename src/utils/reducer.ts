import {
  Action,
  PlayerInterface,
  CardInterface,
  State,
  TokenInterface,
} from "./Interfaces";
import { cardsFetched, playersFetched, reducerCases } from "./Constants";
import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

export const playersInfo: PlayerInterface[] = playersFetched;

const cardsInfo: CardInterface[] = cardsFetched.map((card) => ({
  ...card,
  id: uuidv4(),
  playerId: null,
}));

playersInfo.forEach((player, index) => {
  cardsInfo[cardsInfo.length - 1 - index].playerId = player.socketId;
});

const tokensInfo: TokenInterface[] = [];
playersInfo.forEach((player) => {
  tokensInfo.push({ id: uuidv4(), active: false, activePlayerId: null, playerId: player.socketId });
  tokensInfo.push({ id: uuidv4(), active: false, activePlayerId: null, playerId: player.socketId });
});

const itemsInfo = [...tokensInfo, ...cardsInfo];

export const initialState = {
  spotifyToken: "",
  players: playersInfo,
  activePlayer: playersInfo[0],
  items: itemsInfo,
  activeCard: cardsInfo.filter((card) => card.playerId === null).at(-1),
  tokens: tokensInfo,
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
    case reducerCases.SET_ITEMS: {
      return {
        ...state,
        items: action.items,
      };
    }
    case reducerCases.SET_ACTIVE_CARD: {
      return {
        ...state,
        activeCard: action.activeCard,
      };
    }
    case reducerCases.SET_TOKENS: {
      return {
        ...state,
        tokens: action.tokens,
      };
    }
    default:
      return state;
  }
};
