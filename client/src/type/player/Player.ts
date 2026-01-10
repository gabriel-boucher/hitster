import {PlayerDeck} from "./PlayerDeck.ts";

export type PlayerId = string;

export enum PlayerColor {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple",
  ORANGE = "orange"
}

export type Player = {
  id: PlayerId;
  name: string;
  color: PlayerColor;
  deck: PlayerDeck;
}