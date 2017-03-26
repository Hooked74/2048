import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';

interface IProps {
    store:Redux.Store<any>;
}

interface IState {}

export default class MainContainer extends Component<IProps, IState> {
    public render() {
        return (
            <Provider store={this.props.store}>
                <App />
            </Provider>
        );
    }
}