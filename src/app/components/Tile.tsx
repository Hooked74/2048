import * as React from 'react';
import { Component } from 'react';
import { findDOMNode } from 'react-dom';

import {
    BOARD_CELL_HEIGHT,
    BOARD_CELL_WIDTH,
    TILE_CLASS,
    TILE_TRANSITION_DURATION
} from '../constants';

import {
    ITile,
    IAnimationElement,
    IStyleElement
} from '../interfaces';

interface IProps {
    tile:ITile;
    isEmptyHidden:boolean;
}
interface IState {
    tile:ITile;
    bounceAnimating:boolean;
    moveAnimating:boolean;
    isEmptyHidden:boolean;
}

interface IStyle {
    width:string;
    height:string;
    top:string;
    left:string;
    transitionDuration?:string;
}

type TAnimationResult = {start:string, end:string};
export default class TileComponent extends Component<IProps, IState> implements IAnimationElement, IStyleElement {
    public state:IState = {
        bounceAnimating: false,
        moveAnimating: false,
        tile: this.props.tile,
        isEmptyHidden: this.props.isEmptyHidden
    };

    public animationEvents:TAnimationResult = this.whichAnimationEvents();
    public transitionEvents:TAnimationResult = this.whichTransitionEvents();

    public shouldComponentUpdate(props:IProps, state:IState) {
        return state.tile.value !== this.state.tile.value 
            || state.tile.top !== this.state.tile.top
            || state.tile.left !== this.state.tile.left;
    }

    get style():IStyle {
        return {
            width: `${BOARD_CELL_WIDTH}px`,
            height: `${BOARD_CELL_HEIGHT}px`,
            top: `${this.state.tile.top}px`,
            left: `${this.state.tile.left}px`,
            [this.prefixed("transitionDuration")]: `${TILE_TRANSITION_DURATION}ms`
        };
    }

    public prefixed(unprefixed:string):string {
        const vendors = ["Webkit", "Moz", "O", "ms"];
        const upper = unprefixed[0].toUpperCase() + unprefixed.slice(1);
        const length = vendors.length;
        const style = document.documentElement.style;

        if (typeof style[unprefixed] === 'undefined') {
            for (var i = 0; i < length; i++) {
                const styleName = vendors[i] + upper;
                if (typeof style[styleName] !== 'undefined') return styleName;
            }
        }

        return unprefixed;
    }

    public whichAnimationEvents():TAnimationResult {
        const el = document.documentElement;
        const animations = {
            "animation": { start: "animationstart", end: "animationend" },
            "msAnimation": { start: "animationstart", end: "animationend" },
            "OAnimation": { start: "oAnimationStart", end: "oAnimationEnd" },
            "MozAnimation": { start: "animationstart", end: "animationend" },
            "WebkitAnimation": { start: "webkitAnimationStart", end: "webkitAnimationEnd" }
        };
        return animations[this.prefixed("animation")];
    }

    public whichTransitionEvents():TAnimationResult {
        const el = document.documentElement;
        const animations = {
            "transition": { start: "transitionstart", end: "transitionend" },
            "msTransition": { start: "transitionstart", end: "transitionend" },
            "OTransition": { start: "oTransitionStart", end: "oTransitionEnd" },
            "MozTransition": { start: "transitionstart", end: "transitionend" },
            "WebkitTransition": { start: "webkitTransitionStart", end: "webkitTransitionEnd" }
        };
        return animations[this.prefixed("transition")];
    }

    public componentDidMount() {
        const element:Element = findDOMNode(this);
        element.addEventListener(this.animationEvents.start, () => this.setState({ bounceAnimating: true }), false);
        element.addEventListener(this.animationEvents.end, () => this.setState({ bounceAnimating: false }), false);
        element.addEventListener(this.transitionEvents.start, () => this.setState({ moveAnimating: true }), false);
        element.addEventListener(this.transitionEvents.end, () => this.setState({ moveAnimating: false }), false);
    }

    public render() {
        let className = `${TILE_CLASS} ${TILE_CLASS}${this.state.tile.value}`;
        if (this.state.isEmptyHidden) className += " first-hidden";
        return <div
            key={this.state.tile.id}
            data-bounceAnimating={this.state.bounceAnimating}
            data-moveAnimating={this.state.moveAnimating}
            className={className} 
            style={this.style}>{this.state.tile.value}</div>;
    }
}