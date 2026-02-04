import {PlayerDeck} from "./PlayerDeck.ts";

export type PlayerId = string;

export enum PlayerColor {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  YELLOW = "yellow",
  ORANGE = "orange",
  PURPLE = "purple",
  PINK = "pink",
  BROWN = "brown",
  BLACK = "black",
  WHITE = "white",
  GRAY = "gray",
  CYAN = "cyan",
  MAGENTA = "magenta",
  LIME = "lime",
  TEAL = "teal",
  NAVY = "navy",
  MAROON = "maroon",
  OLIVE = "olive",
  GOLD = "gold",
  SILVER = "silver"
}

export type Player = {
  id: PlayerId;
  name: string;
  color: PlayerColor;
  deck: PlayerDeck;
}