import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login'
import Register from './components/Register'
import './index.css';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(
    <Router >
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/' component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);