import * as React from 'react';
import { Component } from 'react';
import { autobind } from 'core-decorators'

interface IProps {
    startNewGame:Function;
}
interface IState {}

export default class NewGameButtonComponent extends Component<IProps, IState> {
    @autobind
    private handleClick() {
        if (confirm("Уверены что хотите закончить текущую игру?")) {
            this.props.startNewGame();
        }
    }
    public render() {
        return <button className="btn-game" onClick={this.handleClick}>{this.props.children}</button>;
    }
}