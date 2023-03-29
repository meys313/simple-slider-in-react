import {ItemProps, SliderProps} from "./Slider.props";
import './Slider.scss';
import cn from "classnames";
import {Arrow} from "./components/Arrow/Arrow";
import React, {useEffect, useRef, useState, Children, cloneElement, useLayoutEffect} from "react";
import {getItemClone} from "./helper/getItemClone";

export const Slider = ({children, infinity = true, transition = 500, itemWidth = 100}: SliderProps) => {


    // const [itemsForView, setItemsForView] = useState(
    //     !infinity ? children : [ children[children.length -1 ], ...children, children[0]]
    // );

    const copyElement = infinity? 100 / itemWidth : 0;

    const [itemsForView, setItemsForView] = useState(
        !infinity ? children :
            [
                ...getItemClone('start', copyElement, children ).reverse(),
                ...children,
                ...getItemClone('end', copyElement, children ),
            ]
    );


    const [offset, setOffset] = useState(-(copyElement * itemWidth));
    const currentSlide = Math.abs(offset/ itemWidth) - copyElement

    // const windowRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);
    // const itemRef = useRef<HTMLDivElement>(null);

    const prevSlide = () => {
        if(itemsContainerRef.current){
            itemsContainerRef.current.style.transitionDuration = `${transition}ms`;
        }
        if(infinity && (offset === 0) ){
            return;
        }
        if(offset === 0){
            return;
        }
        setOffset(prevState => prevState + itemWidth);
    }

    const nextSlide = () => {
        if(itemsContainerRef.current){
            itemsContainerRef.current.style.transitionDuration = `${transition}ms`;
        }
        if(infinity && offset === (itemWidth * -(itemsForView.length - 1))) {
            return;
        }
        if(offset === (itemWidth * -(itemsForView.length - 1))){
            return;
        }
        setOffset(prevState => prevState - itemWidth);
    }

    const goToSlide = (slide: number) => {
        if(itemsContainerRef.current){
            itemsContainerRef.current.style.transitionDuration = `${transition}ms`;
        }

        const slidePosition = -( (slide + copyElement ) * itemWidth)
        setOffset(slidePosition)
    }

    const sliderAnimationEnd = () => {
        if(!infinity){ return}
        if(!itemsContainerRef.current){return}

        const maxOffset = -(itemWidth * (children.length + copyElement))
        if(offset > -(copyElement*itemWidth)){
            itemsContainerRef.current.style.transitionDuration = `${0}ms`;
            setOffset(maxOffset + itemWidth)
            return;
        }
        if(offset === maxOffset){
            itemsContainerRef.current.style.transitionDuration = `${0}ms`;
            setOffset(-(copyElement * itemWidth))
        }
    }


    const [touchStart, setTouchStart] = useState(0);
    const swipeSlide = (e: React.TouchEvent) => {

        const currentX = e.changedTouches[0].clientX
        const difference = touchStart - currentX;

        if(difference > -20 && difference < 20 ){
            return;
        }
        if(currentX < touchStart){
            nextSlide();
            return;
        }
        if(currentX > touchStart){
            prevSlide();
            return;
        }

    }



    return (

        <div className={'slider'}>


            <Arrow direction={'left'} className="slider-arrow" onClick={prevSlide}/>
            <Arrow direction={'right'} className="slider-arrow" onClick={nextSlide}/>

            <div className="window">
                <div className={cn("all-items-container")}
                    style={{transform: `translateX(${offset}% )`}}
                    ref = {itemsContainerRef}
                    onTransitionEnd={sliderAnimationEnd}
                    onTouchStart={(e)=> setTouchStart(e.touches[0].clientX)}
                    onTouchEnd={swipeSlide}
                >
                    {
                       Children.map(itemsForView, (child) => {

                           return cloneElement(child, {
                               className: cn(child.props.className, 'item'),
                               style: { width: `${itemWidth}%`, minWidth: `${itemWidth}%`, maxWidth: `${itemWidth}%`}

                           })
                       })
                    }
                </div>
            </div>


            <div className="slider-pagination">
                {children.map(
                    (item, index) => {
                        return (
                            <div onClick={goToSlide.bind(null, index)} key={index}>
                                <i className={`fa-${index === currentSlide ? 'solid' : 'regular'} fa-circle`}></i>
                            </div>
                        )
                    }
                )}
            </div>
        </div>

    )
}

