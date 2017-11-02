import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './Test';
import { unregister } from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
    <div>
        <Route component={App} path='/' exact />
        <Route component={Test} path='/test' />
    </div>
</BrowserRouter>, document.getElementById('root'));
unregister();
