import {ArrowProps} from "./Arrow.props";
import styles from './Arrow.module.scss';
import cn from 'classnames';
export const Arrow = ({direction, className, ...props}: ArrowProps) => {
    return (
        <i className={
            cn(
            `fa-solid fa-circle-chevron-${direction}`,
                styles.arrow,
                styles[`position--${direction}`],
                className
            )
        }
       {...props}
        ></i>
    )
}