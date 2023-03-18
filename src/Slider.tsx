import {SliderProps} from "./Slider.props";
import './Slider.scss';
import cn from "classnames";
import {Arrow} from "./components/Arrow/Arrow";
import {useRef, useState} from "react";
export const Slider = ({items, infinity = true, transition = 300}: SliderProps)=> {


    const [itemsForView, setItemsForView] = useState([...items])
    const [offset, setOffset] = useState(0);


    const itemRef = useRef(null);
    const swipeSlide = (to: 'left'|'right')=> {
        if(!itemRef.current){
            return
        }
        const itemWidth = parseInt(getComputedStyle(itemRef.current).width)
        console.log(itemWidth)
        const offsetTo = to === 'left'? itemWidth : -itemWidth;

        if(offset === 0 && offsetTo > 0 || offset === offsetTo * (itemsForView.length - 1)){
            return;
        }

        setOffset(currentOffset => currentOffset + offsetTo)
    }
    return(
        <div className={'slider'}>
            <div className="window">
                <Arrow direction={"left"} onClick={()=> swipeSlide('left')}/>
                <div className="all-items-container"
                     style={{transform: `translateX(${offset}px)`}}
                >
                    {
                        itemsForView.map(
                            (item, index) => <div key={item.id} className={cn('item', `item-${index}`)} ref={itemRef}>
                                {item.text}
                                <img src={item.img} alt="img" className="item-img"/>
                                <div>{offset}</div>
                            </div>
                        )
                    }
                </div>
                <Arrow direction={'right'} onClick={() => swipeSlide('right')}/>
            </div>
        </div>
    )
}