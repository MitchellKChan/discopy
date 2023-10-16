import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SplashPage from './components/SplashPage';
import RegisterPage from './components/RegisterPage';
import Main from './components/Main';
import Modal from './components/Modal/Modal';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <Modal />
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route path="/channels/:serverId">
          <Main />
        </Route>
        <Route path="/">
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
