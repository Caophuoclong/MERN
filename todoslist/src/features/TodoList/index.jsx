import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom'

import ToodoList from "./pages/Main"
import AddnEdit from "./pages/AddnEdit"


function TodoList() {
    const match = useRouteMatch();
    

    return (
        <div>
            <Switch>
                <Route exact path={match.url} component={ToodoList}/>
                <Route  path={`${match.url}/add`} component={AddnEdit}/>
                <Route path={`${match.url}/edit/:id`} component={AddnEdit}/> 
            </Switch>
           
        </div>
    );
}

export default TodoList;