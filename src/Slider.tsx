import {Item, SliderProps} from "./Slider.props";
import './Slider.scss';
import cn from "classnames";
import {Arrow} from "./components/Arrow/Arrow";
import {useEffect, useRef, useState, Children, useLayoutEffect} from "react";

export const Slider = ({items, infinity = true, transition = 500}: SliderProps) => {

    const [itemsForView, setItemsForView] = useState(items);
    const itemWidth = 100;
    const [offset, setOffset] = useState(0);
    const [animation, setAnimation] = useState(true);

    const itemsContainerRef = useRef<HTMLDivElement>(null);
    const swipeSlide = (swipeTo: 'prevSlide'|'nextSlide') => {
        if(itemsContainerRef.current){
            itemsContainerRef.current.style.transitionDuration = `${transition}ms`;
        }
        const offsetTo = swipeTo === 'prevSlide' ? itemWidth : -itemWidth;
        // if(infinity && offset == -itemWidth && offsetTo > 0){
        //
        //     return;
        //
        // }
        if(infinity && offset === 0){
            return;
        }
        setOffset(prevState => prevState + offsetTo);
    }

    useLayoutEffect(() => {
        if(infinity){
            setItemsForView([
                items[items.length -1 ],
                ...items,
                items[0]
            ])
            setOffset(-itemWidth);

        }
    }, [])

    // useEffect(()=> {
    //     const transitionEnd = () => {
    //         setAnimation(false);
    //     }
    //     document.addEventListener('transitionend', transitionEnd)
    //
    //     return () => {
    //         document.removeEventListener('transitionend', transitionEnd)
    //     }
    // }, [offset])

    useLayoutEffect(()=> {
        if(!itemsContainerRef.current){
            return;
        }
            const transitionEnd = () => {
            console.log(offset)
                if(offset === 0){
                    if(!itemsContainerRef.current){return}
                    itemsContainerRef.current.style.transitionDuration = `${0}ms`;
                    setOffset(-300)
                }
            }
            document.addEventListener('transitionend', transitionEnd)

            return () => {
                document.removeEventListener('transitionend', transitionEnd)
            }


    }, [itemsContainerRef.current, offset])


    return (
        <div className={'slider'}>
            <div className="window">
                <Arrow direction={'left'} onClick={swipeSlide.bind(null, 'prevSlide')}/>
                <div className={cn("all-items-container")}
                 style={{transform: `translateX(${offset}% )`}}
                 ref = {itemsContainerRef}
                >
                    {
                        itemsForView.map(
                            (item, index) => <div className={cn('item', `item-${index}`)}>
                                {item.text}
                            </div>
                        )
                    }
                </div>
                <Arrow direction={'right'} onClick={swipeSlide.bind(null, 'nextSlide')}/>
            </div>

        </div>


    )
}

