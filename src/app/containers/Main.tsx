let Main;
if (NODE_ENV === NODE_ENV_DEV) {
    Main = require('./Main.dev').default;
} else {
    Main = require('./Main.prod').default;    
}
export default Main;