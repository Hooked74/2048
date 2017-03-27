import * as React from 'react';
import { Component } from 'react';

interface IProps {}
interface IState {}

export default class HeaderComponent extends Component<IProps, IState> {
    public render() {
        return (
            <header id="header">
                <h1><a href="https://github.com/Hooked74/2048.git">2048</a></h1>
            </header>
        );
    }
}