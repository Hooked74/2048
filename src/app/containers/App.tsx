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
    moveTiles:Function;  
    createNewTile:Function; 
}
interface IConnectedOwnProps {}

interface IState {}

const mapStateToProps = (state:IConnectedProps):IConnectedProps => state;
const mapDispatchToProps = (dispatch:Redux.Dispatch<any>):IConnectedDispatchProps => {
    return bindActionCreators(Object.assign({}, actions), dispatch);
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
                    createNewTile={this.props.createNewTile}
                    moveTiles={this.props.moveTiles}/>
            </div>
        );
    }
}

export default connect<IConnectedProps, IConnectedDispatchProps, IConnectedOwnProps>(mapStateToProps, mapDispatchToProps)(AppContainer);