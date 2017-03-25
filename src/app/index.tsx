import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.number.is-finite.js";

import * as React from 'react';
import { render } from 'react-dom';
import Main from './containers/Main';
import configureStore from './store/configureStore';

render(<Main store={configureStore()} />, document.getElementById('main'));

import './easter-egg';