import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import anecdoteReducer from "./reducer"
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(anecdoteReducer)

const render = () => {
    ReactDOM.render(
        <App store={store} />,
        document.getElementById('root')
    )
}
serviceWorker.unregister();

render()
store.subscribe(render)
