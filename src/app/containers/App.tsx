import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

//import * as actions from '../actions';

import Board from '../components/Board';

interface IConnectedProps {}
interface IConnectedDispatchProps {}
interface IConnectedOwnProps {}

interface IState {

}

const mapStateToProps = (state:IConnectedProps):IConnectedProps => state;

class AppContainer extends Component<IConnectedProps & IConnectedDispatchProps, IState> {
    public render() {
        return (
            <div id="app">
                <Board />
            </div>
        );
    }
}

export default connect<IConnectedProps, IConnectedDispatchProps, IConnectedOwnProps>(mapStateToProps)(AppContainer);