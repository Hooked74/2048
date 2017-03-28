import * as React from 'react';
import { Component } from 'react';

interface IProps {
    value:number;
}
interface IState {}

export default class ScoresheetComponent extends Component<IProps, IState> {
    public render() {
        return (
            <div className="scoresheet">
                <span>{this.props.children}</span>
                {this.props.value}
            </div>
        );
    }
}