import * as React from 'react';
import { Component } from 'react';

interface IProps {}
interface IState {}

export default class EndGameOverlayComponent extends Component<IProps, IState> {
    public render() {
        return <div id="endGameOverlay"></div>;
    }
}