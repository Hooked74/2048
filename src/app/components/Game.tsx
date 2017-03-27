import * as React from 'react';
import { Component } from 'react';

import {
    ITileCollection
} from '../interfaces';

import NewGameButton from './NewGameButton';
import Scoresheet from './Scoresheet';
import Board from './Board';

interface IProps {
    tileCollection:ITileCollection;
    startNewGame:Function;
}
interface IState {}

export default class GameComponent extends Component<IProps, IState> {
    public componentDidMount() {}

    public render() {
        return (
            <section id="game">
                <div id="gameWrapper">
                    <div id="gameHeader">
                        <NewGameButton startNewGame={this.props.startNewGame}>Новая игра</NewGameButton>
                        <div id="gameScores">
                            <Scoresheet>Очки</Scoresheet>
                            {window.localStorage ? <Scoresheet>Лучший результат</Scoresheet> : null}
                        </div>
                    </div>
                    <Board 
                        tileCollection={this.props.tileCollection}
                        startNewGame={this.props.startNewGame}/>
                </div>  
            </section>
        );
    }
}