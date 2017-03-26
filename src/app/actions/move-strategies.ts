import {
    ITile,
    ITileCollection,
    ITileRow
} from '../interfaces';

const moveStrategies = {
    moveTilesToLeft(tc:ITileCollection) { // Двигаем плитки справа налево
        const newTC:ITileCollection = []; // собираем новую коллекцию плиток
        let scores = 0; // подсчитываем очки объединенных плиток
        for (let i:number = 0; i < tc.length; i++) { // идем по строкам матрицы сверху вних
            let concatenated = false; // если мы соединили 2 плитки, то не присоединять к ним следующею
            let row:ITileRow = []; // собираем строку плиток
            const emptyTiles:ITileRow = []; // пустые плитки
            for (let j:number = 0; j < tc[i].length; j++) { // идем по столбцам матрицы слева направо
                const rowLastIndex = row.length -1; // индекс последней плитки в строке
                // если плитка пустая добавляем в конец пустых плиток
                if (tc[i][j].value === 0) {
                    emptyTiles.push(tc[i][j]);
                // если текущая и предыдущая плитки имеют одинаковые значения и до этого не соединялись
                } else if (row[rowLastIndex] 
                    && row[rowLastIndex].value === tc[i][j].value 
                    && !concatenated) { 
                    const value = tc[i][j].value * 2;
                    scores += value; // увеличиваем очки на сумму плиток
                    // удваиваем значение последней плитки
                    row[rowLastIndex] = {
                        ...row[rowLastIndex],
                        value
                    };
                    // обнуляем текущую плитку и записываем в начало пустых плиток
                    emptyTiles.unshift({
                        ...tc[i][j],
                        value: 0
                    });
                    // фиксируем соединение плиток
                    concatenated = true;
                } else {
                    // добавляем плитку в конец строки
                    row.push(tc[i][j]);
                    // если было соединение плиток, то обнуляем его
                    if (concatenated) concatenated = false;  
                }
            }
            // соединяем строку плиток с пустыми плитками и упорядочиваем их координаты
            row = row.concat(emptyTiles).map((t:ITile, j:number):ITile => ({
                ...t, 
                top: tc[i][j].top, 
                left: tc[i][j].left
            }));
            newTC.push(row);
        }
        return { tileCollections: newTC, scores };
    },
    moveTilesToRight(tc:ITileCollection) { // Двигаем плитки слева направо
        const newTC:ITileCollection = []; // собираем новую коллекцию плиток
        let scores = 0; // подсчитываем очки объединенных плиток
        for (let i:number = 0; i < tc.length; i++) { // идем по строкам матрицы сверху вних
            let concatenated = false; // если мы соединили 2 плитки, то не присоединять к ним следующею
            let row:ITileRow = []; // собираем строку плиток
            const emptyTiles:ITileRow = []; // пустые плитки
            for (let j:number = tc[i].length; j--;) { // идем по столбцам матрицы справа налево
                // если плитка пустая добавляем в начало пустых плиток
                if (tc[i][j].value === 0) {
                    emptyTiles.unshift(tc[i][j]);
                // если текущая и следующая плитки имеют одинаковые значения и до этого не соединялись
                } else if (row[0] 
                    && row[0].value === tc[i][j].value
                    && !concatenated) {
                    const value = tc[i][j].value * 2;
                    scores += value; // увеличиваем очки на сумму плиток
                    // удваиваем значение следующей плитки
                    row[0] = {
                        ...row[0],
                        value
                    };
                    // обнуляем текущую плитку и записываем в конец пустых плиток
                    emptyTiles.push({
                        ...tc[i][j],
                        value: 0
                    });
                    // фиксируем соединение плиток
                    concatenated = true;
                } else {
                    // добавляем плитку в начало строки
                    row.unshift(tc[i][j]);
                    // если было соединение плиток, то обнуляем его
                    if (concatenated) concatenated = false;   
                }
            }
            // соединяем пустые плитки со строкой плиток и упорядочиваем их координаты
            row = emptyTiles.concat(row).map((t:ITile, j:number):ITile => ({
                ...t, 
                top: tc[i][j].top, 
                left: tc[i][j].left
            }));
            newTC.push(row);
        }
        return { tileCollections: newTC, scores };
    },
    moveTilesToTop(tc:ITileCollection) { // Двигаем плитки снизу вверх
        const newTC:ITileCollection = []; // собираем новую коллекцию плиток
        let scores = 0; // подсчитываем очки объединенных плиток
        for (let i:number = 0; i < tc.length; i++) { // идем по строкам матрицы сверху вних
            let concatenated = false; // если мы соединили 2 плитки, то не присоединять к ним следующею
            let column:ITileRow = []; // собираем столбец плиток
            const emptyTiles:ITileRow = []; // пустые плитки
            for (let j:number = 0; j < tc[i].length; j++) { // идем по столбцам матрицы справа налево
                const columnLastIndex = column.length -1; // индекс последней плитки в столбце
                // если плитка пустая добавляем в конец пустых плиток
                if (tc[j][i].value === 0) {
                    emptyTiles.push(tc[j][i]);
                // если текущая и предыдущая плитки имеют одинаковые значения и до этого не соединялись
                } else if (column[columnLastIndex] 
                    && column[columnLastIndex].value === tc[j][i].value
                    && !concatenated) {
                    const value = tc[j][i].value * 2;
                    scores += value; // увеличиваем очки на сумму плиток
                    // удваиваем значение последней плитки
                    column[columnLastIndex] = {
                        ...column[columnLastIndex],
                        value
                    };
                    // обнуляем текущую плитку и записываем в начало пустых плиток
                    emptyTiles.unshift({
                        ...tc[j][i],
                        value: 0
                    });
                    // фиксируем соединение плиток
                    concatenated = true;
                } else {
                    // добавляем плитку в конец столбца
                    column.push(tc[j][i]);
                    // если было соединение плиток, то обнуляем его
                    if (concatenated) concatenated = false; 
                }
            }
            // соединяем столбец плиток с пустыми плитками и записываем результат в коллекцию
            column.concat(emptyTiles).forEach((t:ITile, j:number) => {
                if (!newTC[j]) newTC[j] = [];
                newTC[j][i] = {
                    ...t,
                    top: tc[j][i].top,
                    left: tc[j][i].left
                };
            });
        }
        return { tileCollections: newTC, scores };
    },
    moveTilesToBottom(tc:ITileCollection) { // Двигаем плитки сверху вниз
        const newTC:ITileCollection = []; // собираем новую коллекцию плиток
        let scores = 0; // подсчитываем очки объединенных плиток
        for (let i:number = 0; i < tc.length; i++) { // идем по строкам матрицы сверху вних
            let concatenated = false; // если мы соединили 2 плитки, то не присоединять к ним следующею
            let column:ITileRow = []; // собираем столбец плиток
            const emptyTiles:ITileRow = []; // пустые плитки
            for (let j:number = tc[i].length; j--;) { // идем по столбцам матрицы справа налево
                // если плитка пустая добавляем в начало пустых плиток
                if (tc[j][i].value === 0) {
                    emptyTiles.unshift(tc[j][i]);
                // если текущая и следующая плитки имеют одинаковые значения и до этого не соединялись
                } else if (column[0] 
                    && column[0].value === tc[j][i].value
                    && !concatenated) {
                    const value = tc[j][i].value * 2;
                    scores += value; // увеличиваем очки на сумму плиток
                    // удваиваем значение следующей плитки
                    column[0] = {
                        ...column[0],
                        value 
                    };
                    // обнуляем текущую плитку и записываем в конец пустых плиток
                    emptyTiles.push({
                        ...tc[j][i],
                        value: 0
                    });
                    // фиксируем соединение плиток
                    concatenated = true;
                } else {
                    // добавляем плитку в начало столбца
                    column.unshift(tc[j][i]);
                    // если было соединение плиток, то обнуляем его
                    if (concatenated) concatenated = false;  
                }
            }
            // соединяем пустые плитки со столбцом плиток и записываем результат в коллекцию
            emptyTiles.concat(column).forEach((t:ITile, j:number) => {
                if (!newTC[j]) newTC[j] = [];
                newTC[j][i] = {
                    ...t,
                    top: tc[j][i].top,
                    left: tc[j][i].left
                };
            });
        }
        return { tileCollections: newTC, scores };
    }
};

export default moveStrategies;