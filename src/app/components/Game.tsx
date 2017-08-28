import * as React from 'react';
import { Component } from 'react';
import { autobind } from 'core-decorators';

import {
    GAME_STARTED,
    TILE_CLASS,
    TILE_TRANSITION_DURATION,
    ArrowKeys
} from '../constants';

import {
    ITileCollection,
    IScoresState,
    IGameState
} from '../interfaces';

import {
    sleep
} from '../utils';

import NewGameButton from './NewGameButton';
import Scoresheet from './Scoresheet';
import Board from './Board';

interface IProps {
    game:IGameState;
    scores:IScoresState;
    tileCollection:ITileCollection;
    startNewGame:Function;
    pendingGame:Function;
    moveTiles:Function;
}
interface IState {}

export default class GameComponent extends Component<IProps, IState> {
    private isMoving:boolean  = false; 
    private lastPositionX:number = 0;
    private lastPositionY:number = 0;
    private movingMinDelta:number = 100;

    get maxScores():number {
        const savedScores:number = parseInt(localStorage.getItem("maxScores"));
        if (Number.isFinite(savedScores) && savedScores >= this.props.scores.value) {
            return savedScores;
        } else {
            localStorage.setItem("maxScores", `${this.props.scores.value}`);
            return this.props.scores.value;   
        }
    }

    get tilesElements():NodeList {
        return document.querySelectorAll(`.${TILE_CLASS}`);
    }

    get tilesAnimating():boolean {
        const elements:any = this.tilesElements;
        for (let i = 0; i < elements.length; i++) {
            const element:HTMLElement = elements[i];
            if (element.dataset.bounceAnimating === "true" 
                || element.dataset.moveAnimating === "true") {
                    return true;
                }
        }
        return false;
    }

    private getDirection(x:number, y:number):string {
        var deltaX = this.lastPositionX - x,
            deltaY = this.lastPositionY - y;

        if (Math.abs(deltaX) < this.movingMinDelta && Math.abs(deltaY) < this.movingMinDelta) return;
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
            return "left";
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
            return "right";
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
            return "top";
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
            return "bottom";
        }
    }

    @autobind
    private async handleMoveTiles(e) {
        if (!this.isMoving && e) {
            this.isMoving = true;
            let direction:string = e;

            if (typeof e !== "string") {
                if (this.lastPositionX === null) this.lastPositionX = e.clientX;
                if (this.lastPositionY === null) this.lastPositionY = e.clientY;
                
                direction = this.getDirection(e.clientX, e.clientY);
            }

            if (!direction || this.tilesAnimating) return this.isMoving = false;
            
            await this.props.moveTiles(direction);
            this.lastPositionX = null;
            this.lastPositionY = null;
            this.isMoving = false;
        }
    }

    public componentDidMount() {
        this.props.startNewGame();

        document.addEventListener("keydown", e => {
            let direction:string = ArrowKeys[e.keyCode];
            if (direction) {
                this.handleMoveTiles(direction.toLowerCase());
            }
        }, false)

        document.addEventListener("mousedown", e => {
            if (this.props.game.status === GAME_STARTED) {
                e.preventDefault();
                this.lastPositionX = e.clientX;
                this.lastPositionY = e.clientY;
                document.addEventListener("mousemove", this.handleMoveTiles, false);
            }
        }, false);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", this.handleMoveTiles, false);
        }, false);
    }

    @autobind
    public async resetGame() {
        this.props.pendingGame();
        await sleep(1);
        this.props.startNewGame();
    }

    public render() {
        return (
            <section id="game">
                <div id="gameWrapper">
                    <div id="gameHeader">
                        <NewGameButton startNewGame={this.resetGame}>Новая игра</NewGameButton>
                        <div id="gameScores">
                            <Scoresheet value={this.props.scores.value}>Очки</Scoresheet>
                            {window.localStorage ? <Scoresheet value={this.maxScores}>Лучший результат</Scoresheet> : null}
                        </div>
                    </div>
                    <Board
                        game={this.props.game}
                        tileCollection={this.props.tileCollection}
                        startNewGame={this.resetGame}/>
                </div>  
            </section>
        );
    }
}