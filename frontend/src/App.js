import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.session.user);
  return (
    <Switch>
      <Route path="/login">
        <h1>Hello {user ? user.username : 'Discopy Users'} from App!</h1>
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default App;
