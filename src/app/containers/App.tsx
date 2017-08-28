import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {
    ITileCollection,
    IScoresState,
    IGameState,
    IActionSuccess
} from '../interfaces';

import Header from '../components/Header';
import Game from '../components/Game';

interface IConnectedProps {
    game:IGameState;
    scores:IScoresState;
    tileCollection:ITileCollection;
}
interface IConnectedDispatchProps {
    startNewGame:Function;
    pendingGame:Function;
    moveTiles:Function;  
}
interface IConnectedOwnProps {}

interface IState {}

interface ICustomActionCreator extends Redux.ActionCreator<any> {
    [key:string]:any
}

const mapStateToProps = (state:IConnectedProps):IConnectedProps => state;
const mapDispatchToProps = (dispatch:Redux.Dispatch<any>):IConnectedDispatchProps => {
    const actionCreators:any = Object.assign({}, actions);
    return bindActionCreators(actionCreators, dispatch);
};

class AppContainer extends Component<IConnectedProps & IConnectedDispatchProps, IState> {
    public render() {
        return (
            <div id="app">
                <Header />
                <Game
                    game={this.props.game}
                    scores={this.props.scores}
                    tileCollection={this.props.tileCollection}
                    startNewGame={this.props.startNewGame}
                    pendingGame={this.props.pendingGame}
                    moveTiles={this.props.moveTiles}/>
            </div>
        );
    }
}

export default connect<IConnectedProps, IConnectedDispatchProps, IConnectedOwnProps>(mapStateToProps, mapDispatchToProps)(AppContainer);