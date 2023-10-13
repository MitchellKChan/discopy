import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './reset.css';
import './index.css';
import './fonts.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as entitiesActions from './store/entities';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.entitiesActions = entitiesActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (sessionStorage.getItem("currentEntities") === null || 
  sessionStorage.getItem("X-CSRF-Token") === null) {
  store.dispatch(entitiesActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}