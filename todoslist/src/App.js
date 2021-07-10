import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import TodoList from "./features/TodoList";
import NotFound from "./components/NotFound";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/todo" />
          <Route path="/todo" component={TodoList} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
