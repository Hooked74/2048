import * as React from 'react';
import { Component } from 'react';

interface IProps {}
interface IState {}

export default class BoardComponent extends Component<IProps, IState> {
    public render() {
        return <div id="board"></div>;
    }
}