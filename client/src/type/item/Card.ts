import { ItemStatus } from "./ItemStatus.ts";

export type CardId = string;

export type Card = {
  id: CardId;
  status: ItemStatus;
  song: string;
  artist: string;
  date: string;
  albumUrl: string;
}