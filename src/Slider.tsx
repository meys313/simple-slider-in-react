import {Item, SliderProps} from "./Slider.props";
import './Slider.scss';
import cn from "classnames";
import {Arrow} from "./components/Arrow/Arrow";
import {useEffect, useRef, useState, Children, useLayoutEffect} from "react";

export const Slider = ({items, infinity = true, transition = 500}: SliderProps) => {

    const [itemsForView, setItemsForView] = useState(
        !infinity ? items : [ items[items.length -1 ], ...items, items[0]]
    );

    const copyElement = infinity? 1 : 0;
    const itemWidth = 100;
    const [offset, setOffset] = useState(-(copyElement * itemWidth));
    const currentSlide = Math.abs(offset/ itemWidth) - copyElement

    // const windowRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    // const itemRef = useRef<HTMLDivElement>(null);


    const swipeSlide = (swipeTo: 'prevSlide'|'nextSlide') => {
        if(itemsContainerRef.current){
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

        const slidePosition = -( (slide + copyElement ) * itemWidth)
        setOffset(slidePosition)
    }

    const transitionEnd = () => {
        if(!itemsContainerRef.current){return}

        const maxOffset = -(itemWidth * (itemsForView.length - 1))
        if(offset === 0){
            itemsContainerRef.current.style.transitionDuration = `${0}ms`;
            setOffset(maxOffset + itemWidth)
            return;
        }
        if(offset === maxOffset){
            itemsContainerRef.current.style.transitionDuration = `${0}ms`;
            setOffset(-itemWidth)
        }
    }



    return (
        <div className={'slider'}>
            <Arrow direction={'left'} onClick={swipeSlide.bind(null, 'prevSlide')}/>
            <Arrow direction={'right'} onClick={swipeSlide.bind(null, 'nextSlide')}/>

            <div className="window">
                <div className={cn("all-items-container")}
                     style={{transform: `translateX(${offset}% )`}}
                     ref = {itemsContainerRef}
                     onTransitionEnd={transitionEnd}
                >
                    {
                        itemsForView.map(
                            (item, index) => <div className={cn('item', `item-${index}`)}>
                                <div className="slider-content">
                                    <p>{item.text}</p>
                                </div>
                                <img src={item.img} alt="img" className='item-img'/>
                            </div>
                        )
                    }
                </div>
            </div>
            {currentSlide}

            <div className="slider-pagination">
                {items.map(
                    (item, index) => {
                        return (
                            <div onClick={goToSlide.bind(null, index)}>
                                <i className={`fa-${index === currentSlide ? 'solid' : 'regular'} fa-circle`}></i>
                            </div>
                        )
                    }
                )}
            </div>

        </div>


    )
}

