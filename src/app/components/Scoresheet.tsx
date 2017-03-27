import * as React from 'react';
import { Component } from 'react';

interface IProps {}
interface IState {}

export default class ScoresheetComponent extends Component<IProps, IState> {
    public render() {
        return (
            <div className="scoresheet">
                <span>{this.props.children}</span>0
            </div>
        );
    }
}