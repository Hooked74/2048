export interface IAction extends Redux.Action {
    readonly type:string;
    readonly payload?:any;
}

export interface IActionSuccess extends IAction {}

export interface IActionError extends IAction {
    readonly error:Error;
}

export interface IActionPromise extends IAction {
    readonly promiseTypes:Array<string>;
    readonly promise:Promise<any>;
}