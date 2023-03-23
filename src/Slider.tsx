import {Item, SliderProps} from "./Slider.props";
import './Slider.scss';
import cn from "classnames";
import {Arrow} from "./components/Arrow/Arrow";
import {useEffect, useRef, useState, Children, useLayoutEffect} from "react";

export const Slider = ({items, infinity = true, transition = 500}: SliderProps) => {

    const [itemsForView, setItemsForView] = useState(items);
    const copyElement = infinity? 1 : 0;
    const itemWidth = 100;
    const [offset, setOffset] = useState(0);
    const windowRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);


    const swipeSlide = (swipeTo: 'prevSlide'|'nextSlide') => {
        if(itemsContainerRef.current && itemRef.current){
            itemsContainerRef.current.style.transitionDuration = `${transition}ms`;
        }
        const offsetTo = swipeTo === 'prevSlide' ? itemWidth : -itemWidth;

        if(infinity && (offset === 0 || offset === (itemWidth * -(itemsForView.length - 1)) ) ){
            return;
        }
        if((offset === 0 && offsetTo > 0 || offset === (itemWidth * -(itemsForView.length - 1)) && offsetTo<0) ){
            return;
        }
        setOffset(prevState => prevState + offsetTo);
    }

    const goToSlide = (slide: number) => {
        const copy = infinity? 1: 0;
        const slidePosition = -( (slide + copy ) * itemWidth)
        setOffset(slidePosition)
    }

    useLayoutEffect(() => {
        if(!windowRef.current || !itemRef.current){ return }



        if(infinity){
            setItemsForView([
                items[items.length -1 ],
                ...items,
                items[0]
            ])
            setOffset(-itemWidth);


        }
    }, [])


    useLayoutEffect(()=> {

        if(!itemsContainerRef.current && infinity){
            return;
        }

        if(!infinity){
            return;
        }
        const transitionEnd = () => {
            if(!itemsContainerRef.current){return}
            itemsContainerRef.current.style.transitionDuration = `${0}ms`;

            const maxOffset = -(itemWidth * (itemsForView.length - 1))
            if(offset === 0){
                setOffset(maxOffset + itemWidth)
                return;
            }
            if(offset === maxOffset){
                setOffset(-itemWidth)
            }
        }
        document.addEventListener('transitionend', transitionEnd)

        return () => {
            document.removeEventListener('transitionend', transitionEnd)
        }


    }, [itemsContainerRef.current, offset])


    return (
        <div className={'slider'}>
            <Arrow direction={'left'} onClick={swipeSlide.bind(null, 'prevSlide')}/>
            <Arrow direction={'right'} onClick={swipeSlide.bind(null, 'nextSlide')}/>

            <div className="window" ref={windowRef}>
                <div className={cn("all-items-container")}
                     style={{transform: `translateX(${offset}% )`}}
                     ref = {itemsContainerRef}
                >
                    {
                        itemsForView.map(
                            (item, index) => <div className={cn('item', `item-${index}`)} ref={itemRef}>
                                <div className="slider-content">
                                    <p>{item.text}</p>
                                </div>
                                <img src={item.img} alt="img" className='item-img'/>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="slider-pagination">
                {items.map(
                    (item, index) => {
                        return (
                            <div onClick={goToSlide.bind(null, index)}>
                                <i
                                    className={
                                    `
                                    fa-${
                                        index === Math.abs(offset/itemWidth)- copyElement 
                                        ? 
                                        'solid'
                                        : 'regular'
                                    
                                    } 
                                    fa-circle
                                    `
                                }
                                >

                                </i>
                            </div>
                        )
                    }
                )}
            </div>

        </div>


    )
}

