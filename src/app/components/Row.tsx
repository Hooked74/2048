import * as React from 'react';
import { Component } from 'react';

import {
    BOARD_SIDE_LENGTH,
    BOARD_CELL_GAP
} from '../constants';

import Cell from './Cell';

interface IProps {
    indent:boolean;
}
interface IState {}

interface IStyle {
    marginBottom?:string;
}

export default class RowComponent extends Component<IProps, IState> {
    get cells():Array<React.ReactElement<any>> {
        const cells:Array<React.ReactElement<any>> = [];
        for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
            cells.push(<Cell indent={BOARD_SIDE_LENGTH !== i + 1} key={i} />);
        }
        return cells;
    }

    get style():IStyle {
        const style:IStyle = {};
        if (this.props.indent) style.marginBottom = `${BOARD_CELL_GAP}px`;
        return style;
    }

    public shouldComponentUpdate() {
        return false;
    }

    public render() {
        return <div className="row" style={this.style}>{this.cells}</div>;
    }
}