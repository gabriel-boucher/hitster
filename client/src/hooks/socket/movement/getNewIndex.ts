import * as React from "react";
import {Card} from "../../../type/item/Card.ts";
import {Token} from "../../../type/item/Token.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";

export default function getNewIndex(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, items: (Card | Token)[], over: Card | Token, currentItemStatus: ItemStatus) {
    const rect = e.currentTarget.getBoundingClientRect();

    let clientX: number;

    if ("touches" in e) {
        clientX = e.touches[0].clientX;
    } else {
        clientX = e.clientX;
    }

    const mouseX = clientX - rect.left;
    const overIndex = items.findIndex(
        (item) => item.id === over.id
    );

    if (currentItemStatus !== ItemStatus.MOVING_IN_CURRENT_DECK) { // if mouse entering the deck
        return mouseX < rect.width / 2 ? overIndex : overIndex + 1;
    }
    return overIndex; // if mouse already in deck
}