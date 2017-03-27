import * as React from 'react';
import { Component } from 'react';

import {
    BOARD_SIDE_LENGTH,
    BOARD_CELL_GAP
} from '../constants';

import {
    ITileCollection
} from '../interfaces';

import Row from './Row';

interface IProps {
    tileCollection:ITileCollection;
    startNewGame:Function;
}
interface IState {}

interface IStyle {
    border:string;
}

export default class BoardComponent extends Component<IProps, IState> {
    get rows():Array<React.ReactElement<any>> {
        const rows:Array<React.ReactElement<any>> = [];
        for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
            rows.push(<Row indent={BOARD_SIDE_LENGTH !== i + 1} key={i} />);
        }
        return rows;
    }

    get style():IStyle {
        return {
            border: `${BOARD_CELL_GAP}px solid`
        };
    }

    public render() {
        return (
            <div id="board" style={this.style}>
                {this.rows}
            </div>
        );
    }
}