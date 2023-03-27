import React, {ReactElement} from "react";

export type ItemProps = {
    id: number,
    text: string;
    img?: string
}
export interface SliderProps{
    // items: ItemProps[];

    children: ReactElement[];
    itemWidth?: 25|50|100;
    infinity?: boolean;
    transition?: number;


}

