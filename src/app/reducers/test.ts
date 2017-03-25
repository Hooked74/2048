const START_LOADING = "START_LOADING"; 
const STOP_LOADING = "STOP_LOADING";

const loadingInitialState = { visible: false, message: '' };
export const loading:Redux.Reducer<any> = (state = loadingInitialState, action) => {
    switch (action.type) {
    case START_LOADING:
        return { visible: true, message: action.payload };
    case STOP_LOADING:
        return { visible: false, message: '' };
    default:
        return state;
    }
};