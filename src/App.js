import './App.css';
import EnterPage from './components/enterPage';
import PlayerSelection from './components/playerSelection';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Board from './components/board';
import ErrorPage from './components/errorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/players">
              <PlayerSelection />
            </Route>
            <Route path="/board">
              <Board></Board>
            </Route>
            <Route path="/error">
              <ErrorPage></ErrorPage>
            </Route>
            <Route path="/">
              <EnterPage />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
