import React, {ReactElement, JSXElementConstructor} from "react";

// type ItemType = ReactElement[]
type ItemType = ReactElement[]

export const getItemClone = (setIn: 'start'|'end', quantity: number, items: ItemType): ItemType => {
    let i;
    // нужен для того, чтобы пробежаться по массиву айтемов
    const quantityArr = Array(quantity).fill(null);

    // массив копий
    const copyItems: ItemType = []
    switch (setIn){
        case 'start':
            for(i in quantityArr){
                copyItems.push(
                    [...items].reverse()[i]
                )
            }
            break;
        case 'end':
            for(i in quantityArr){
                copyItems.push(
                    items[i]
                )
            }
            break;
        default:
            throw new Error("can't recognize setIn");
    }

    return copyItems
}
