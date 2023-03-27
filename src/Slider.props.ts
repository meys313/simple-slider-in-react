import React, {ReactElement} from "react";

export type ItemProps = {
    id: number,
    text: string;
    img?: string
}
export interface SliderProps{
    // items: ItemProps[];

    children: ReactElement[];
    infinity?: boolean;
    transition?: number;

}

