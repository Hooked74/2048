let configureStore:Function;
if (NODE_ENV === NODE_ENV_DEV) {
    configureStore = require('./configureStore.dev').default;
} else {
    configureStore = require('./configureStore.prod').default;    
}
export default configureStore;