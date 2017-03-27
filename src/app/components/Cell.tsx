import * as React from 'react';
import { Component } from 'react';

import {
    BOARD_CELL_GAP,
    BOARD_CELL_HEIGHT,
    BOARD_CELL_WIDTH
} from '../constants';

interface IProps {
    indent:boolean;
}
interface IState {}

interface IStyle {
    width:string;
    height:string;
    marginRight?:string;
}

export default class CellComponent extends Component<IProps, IState> {
    get style():IStyle {
        const style:IStyle = {
            width: `${BOARD_CELL_WIDTH}px`,
            height: `${BOARD_CELL_HEIGHT}px`
        };
        if (this.props.indent) style.marginRight = `${BOARD_CELL_GAP}px`;
        return style;
    }

    public shouldComponentUpdate() {
        return false;
    }

    public render() {
        return <div className="cell" style={this.style}></div>;
    }
}