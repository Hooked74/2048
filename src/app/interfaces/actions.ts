export interface IAction {
    readonly type:string;
}

export interface IActionSuccess extends IAction {
    readonly payload?:any;
}

export interface IActionError extends IAction {
    readonly error:Error;
}

export interface IActionPromise extends IAction {
    readonly promiseTypes:Array<string>;
    readonly promise:Promise<any>;
}