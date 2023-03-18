import React from "react";

export interface ArrowProps extends React.HTMLAttributes<HTMLElement>{
    direction: 'left' | 'right'
}