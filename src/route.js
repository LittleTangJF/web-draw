import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './page/login/index'
import Draw from './page/draw/index'


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path="/"  exact component={Login} />
            <Route path="/draw" exact  component={Draw} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;