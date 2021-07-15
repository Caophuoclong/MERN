import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Covid from "./features/CovidData";
import TodoList from "./features/TodoList";
import NotFound from "./components/NotFound";
import TomatoTimer from "./features/TomatoTimer";
import NavBar from "./components/NavBar";
import "./App.css";
function App() {
  return (
    <div
      className="full-height"
      style={{ backgroundColor: "rgba(255,255,222,0.5)" }}
    >
      <Router>
        <NavBar />
        <Switch>
          <Redirect exact from="/" to="/todo" />
          <Route path="/todo" component={TodoList} />
          <Route path="/covid" component={Covid} />
          <Route path="/timer" component={TomatoTimer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
