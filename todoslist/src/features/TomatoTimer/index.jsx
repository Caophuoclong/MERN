import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MainTimer from "./pages/MainTimer"
import PageNotFound from '../../components/NotFound';

function TomatoTimer(props) {
    return (
        <div>
            <Switch>
                <Route path="/" component={MainTimer}/>
                <Route path="*" component={PageNotFound}/>
            </Switch>
        </div>
    );
}

export default TomatoTimer;