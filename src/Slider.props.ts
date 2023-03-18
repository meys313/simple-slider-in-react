export type Item = {
    id: number,
    text: string;
    img?: string
}
export interface SliderProps{
    items: Item[];
    infinity?: boolean;
    transition?: number;

}