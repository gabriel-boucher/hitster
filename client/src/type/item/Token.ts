import {ItemStatus} from "./ItemStatus.ts";
import {PlayerId} from "../player/Player.ts";

export type TokenId = string;

export type Token = {
  id: TokenId;
  status: ItemStatus;
  ownerId: PlayerId;
}