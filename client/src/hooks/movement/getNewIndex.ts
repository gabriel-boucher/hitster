import {Card} from "../../type/item/Card.ts";
import {Token} from "../../type/item/Token.ts";
import * as React from "react";
import {ItemStatus} from "../../type/item/ItemStatus.ts";

export enum Position {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

export default function getNewIndex(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, items: (Card | Token)[], over: Card | Token, currentItemStatus: ItemStatus, mousePosition: Position) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - rect.left;
    const mouseDirection = relativeX < rect.width / 2 ? Position.LEFT : Position.RIGHT;

    const overIndex = items.findIndex(
      (item) => item.id === over.id
    );

    let indexChange = 0;

    if (currentItemStatus !== ItemStatus.MOVING_IN_CURRENT_DECK) { // mouse entering the deck
        indexChange = mousePosition === Position.LEFT ? 0 : 1;
    } else if (mouseDirection === mousePosition) {
        indexChange = mousePosition === Position.LEFT ? -1 : 1;
    }

    return overIndex + indexChange;
}