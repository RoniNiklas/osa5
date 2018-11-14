import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {store} from './App';
import * as serviceWorker from './serviceWorker';



const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}
serviceWorker.unregister();
renderApp()
store.subscribe(renderApp)
