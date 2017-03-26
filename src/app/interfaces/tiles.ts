export interface ITile {
    id:string;
    top:number;
    left:number;
    value:number;
}

export interface ITileRow extends Array<ITile> {}

export interface ITileCollection extends Array<ITileRow>{}

export interface ITilePosition {
    column:number;
    row:number;
}