import { ITileCollection } from '../../interfaces';

export const movingMock:ITileCollection = [
    [
        { top: 0, left: 0, id: "1", value: 0}, 
        { top: 0, left: 10, id: "2", value: 2}, 
        { top: 0, left: 20, id: "3", value: 0}, 
        { top: 0, left: 30, id: "4", value: 2} 
    ],
    [
        { top: 10, left: 0, id: "5", value: 8}, 
        { top: 10, left: 10, id: "6", value: 8}, 
        { top: 10, left: 20, id: "7", value: 16}, 
        { top: 10, left: 30, id: "8", value: 0} 
    ],
    [
        { top: 20, left: 0, id: "9", value: 16}, 
        { top: 20, left: 10, id: "10", value: 0}, 
        { top: 20, left: 20, id: "11", value: 16}, 
        { top: 20, left: 30, id: "12", value: 0} 
    ],
    [
        { top: 30, left: 0, id: "13", value: 4}, 
        { top: 30, left: 10, id: "14", value: 4}, 
        { top: 30, left: 20, id: "15", value: 4}, 
        { top: 30, left: 30, id: "16", value: 4} 
    ]
];

export const movingScores:number = 68;
export const movingResult:ITileCollection = [
    [
        { top: 0, left: 0, id: "1", value: 0}, 
        { top: 0, left: 10, id: "3", value: 0}, 
        { top: 0, left: 20, id: "2", value: 0}, 
        { top: 0, left: 30, id: "4", value: 4} 
    ],
    [
        { top: 10, left: 0, id: "8", value: 0}, 
        { top: 10, left: 10, id: "5", value: 0}, 
        { top: 10, left: 20, id: "6", value: 16}, 
        { top: 10, left: 30, id: "7", value: 16} 
    ],
    [
        { top: 20, left: 0, id: "10", value: 0}, 
        { top: 20, left: 10, id: "12", value: 0},
        { top: 20, left: 20, id: "9", value: 0}, 
        { top: 20, left: 30, id: "11", value: 32} 
    ],
    [
        { top: 30, left: 0, id: "15", value: 0}, 
        { top: 30, left: 10, id: "13", value: 0}, 
        { top: 30, left: 20, id: "14", value: 8}, 
        { top: 30, left: 30, id: "16", value: 8} 
    ]
];

export const createdNotFinishedMock:ITileCollection = [
    [
        { top: 0, left: 0, id: "1", value: 2}, 
        { top: 0, left: 10, id: "2", value: 2}, 
        { top: 0, left: 20, id: "3", value: 4}, 
        { top: 0, left: 30, id: "4", value: 2} 
    ],
    [
        { top: 10, left: 0, id: "5", value: 8}, 
        { top: 10, left: 10, id: "6", value: 4}, 
        { top: 10, left: 20, id: "7", value: 16}, 
        { top: 10, left: 30, id: "8", value: 0} 
    ],
    [
        { top: 20, left: 0, id: "9", value: 16}, 
        { top: 20, left: 10, id: "10", value: 8}, 
        { top: 20, left: 20, id: "11", value: 4}, 
        { top: 20, left: 30, id: "12", value: 8} 
    ],
    [
        { top: 30, left: 0, id: "13", value: 4}, 
        { top: 30, left: 10, id: "14", value: 2}, 
        { top: 30, left: 20, id: "15", value: 64}, 
        { top: 30, left: 30, id: "16", value: 4} 
    ]
];

export const finishedNotCreatedMock:ITileCollection = [
    [
        { top: 0, left: 0, id: "1", value: 4}, 
        { top: 0, left: 10, id: "2", value: 2}, 
        { top: 0, left: 20, id: "3", value: 4}, 
        { top: 0, left: 30, id: "4", value: 2} 
    ],
    [
        { top: 10, left: 0, id: "5", value: 8}, 
        { top: 10, left: 10, id: "6", value: 4}, 
        { top: 10, left: 20, id: "7", value: 16}, 
        { top: 10, left: 30, id: "8", value: 4} 
    ],
    [
        { top: 20, left: 0, id: "9", value: 16}, 
        { top: 20, left: 10, id: "10", value: 8}, 
        { top: 20, left: 20, id: "11", value: 4}, 
        { top: 20, left: 30, id: "12", value: 8} 
    ],
    [
        { top: 30, left: 0, id: "13", value: 4}, 
        { top: 30, left: 10, id: "14", value: 2}, 
        { top: 30, left: 20, id: "15", value: 64}, 
        { top: 30, left: 30, id: "16", value: 4} 
    ]
];

export const createdAndFinishedMock:ITileCollection = [
    [
        { top: 0, left: 0, id: "1", value: 4}, 
        { top: 0, left: 10, id: "2", value: 2}, 
        { top: 0, left: 20, id: "3", value: 4}, 
        { top: 0, left: 30, id: "4", value: 2} 
    ],
    [
        { top: 10, left: 0, id: "5", value: 8}, 
        { top: 10, left: 10, id: "6", value: 4}, 
        { top: 10, left: 20, id: "7", value: 16}, 
        { top: 10, left: 30, id: "8", value: 4} 
    ],
    [
        { top: 20, left: 0, id: "9", value: 16}, 
        { top: 20, left: 10, id: "10", value: 8}, 
        { top: 20, left: 20, id: "11", value: 4}, 
        { top: 20, left: 30, id: "12", value: 8} 
    ],
    [
        { top: 30, left: 0, id: "13", value: 4}, 
        { top: 30, left: 10, id: "14", value: 2}, 
        { top: 30, left: 20, id: "15", value: 64}, 
        { top: 30, left: 30, id: "16", value: 0} 
    ]
];