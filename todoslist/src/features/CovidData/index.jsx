import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../../components/NotFound';
import Main from "./pages/MainPage";

function Covid(props) {
    return (
        <div>
            <Switch>
                <Route path="/" component={Main}/>
                <Route path="*" component={PageNotFound}/>
            </Switch>
            
        </div>
    );
}

export default Covid;