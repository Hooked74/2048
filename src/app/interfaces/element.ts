export interface IAnimationElement {
    animationEvents:any;
    transitionEvents:any;
    whichAnimationEvents:Function;
    whichTransitionEvents:Function;
}

export interface IStyleElement {
    prefixed:(unprefixed:string) => string;
}
    