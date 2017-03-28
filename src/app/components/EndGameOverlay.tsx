import * as React from 'react';
import { Component } from 'react';

import { GAME_FINISHED } from '../constants'
import { IGameState, IScoresState } from '../interfaces';

import NewGameButton from './NewGameButton';

interface IProps {
    game:IGameState;
    startNewGame:Function;
}
interface IState {}

export default class EndGameOverlayComponent extends Component<IProps, IState> {
    public render() {
        return (
            <div 
                id="endGameOverlay" 
                className={this.props.game.status !== GAME_FINISHED ? "hidden" : ""}>
                <div id="endGameOverlayInfo">{this.props.game.message}</div>
                <NewGameButton startNewGame={this.props.startNewGame}>Попробовать еще раз</NewGameButton>
            </div>
        );
    }
}