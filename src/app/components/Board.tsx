import * as React from 'react';
import { Component } from 'react';

import {
    BOARD_SIDE_LENGTH,
    BOARD_CELL_GAP,
    GAME_PENDING
} from '../constants';

import {
    ITileCollection,
    ITile,
    IGameState
} from '../interfaces';

import Row from './Row';
import Tile from './Tile';
import EndGameOverlay from './EndGameOverlay';

interface IProps {
    game:IGameState;
    tileCollection:ITileCollection;
    startNewGame:Function;
}
interface IState {}

interface IStyle {
    border:string;
}

export default class BoardComponent extends Component<IProps, IState> {
    private tilesElements:Array<React.ReactElement<Tile>> = []; 
    private tilesComponents:Array<any> = []; 

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

    public componentWillUpdate(props:IProps) {
        if (props.game.status === GAME_PENDING) {
            this.tilesElements = [];
            return;    
        }

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
                <EndGameOverlay 
                    startNewGame={this.props.startNewGame} 
                    game={this.props.game}/>
            </div>
        );
    }
}