import * as React from 'react';
import { Component } from 'react';

import {
    BOARD_SIDE_LENGTH,
    BOARD_CELL_GAP
} from '../constants';

import {
    ITileCollection,
    ITile
} from '../interfaces';

import Row from './Row';
import Tile from './Tile';

interface IProps {
    tileCollection:ITileCollection;
    startNewGame:Function;
}
interface IState {}

interface IStyle {
    border:string;
}

export default class BoardComponent extends Component<IProps, IState> {
    private tilesElements:Array<React.ReactElement<Tile>> = []; 
    private tilesComponents:any = []; 
    private tilesElementsHashMap = {};

    get rows():Array<React.ReactElement<Row>> {
        const rows:Array<React.ReactElement<Row>> = [];
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

    public componentWillUpdate(props) {
        const tc:ITileCollection = props.tileCollection || [];
        const isNotFindTiles:boolean = !this.tilesElements.length;
        for (let i:number = 0; i < tc.length; i++) {
            for (let j:number = 0; j < tc[i].length; j++) {
                const currentTile:ITile = tc[i][j];
                if (isNotFindTiles) {
                    this.tilesElements.push(
                        <Tile
                            isEmptyHidden={currentTile.value === 0}
                            key={currentTile.id} 
                            tile={currentTile} 
                            ref={t => {
                                this.tilesComponents[currentTile.id] = t;
                            }}/>
                    );
                } else if (this.tilesComponents[currentTile.id]) {
                    const tileComponent:any = this.tilesComponents[currentTile.id];
                    tileComponent.setState({
                        tile: currentTile,
                        isEmptyHidden: false
                    });
                }
            }
        }
    }

    public render() {
        return (
            <div id="board" style={this.style}>
                {this.rows}
                {this.tilesElements}
            </div>
        );
    }
}