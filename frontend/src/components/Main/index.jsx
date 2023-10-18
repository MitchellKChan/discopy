import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useRouteMatch, Switch } from 'react-router-dom';
import ServerIndex from './Server';
import Content from './Content/Content';
import { Route } from 'react-router-dom';

import "./Main.css";

const Main = () => {
    const currentUser = useSelector(state => state.entities.currentUser);
    const { path } = useRouteMatch();

    if (!currentUser) return <Redirect to="/" />;

    return (
        <>
            <div className="main-container">
                <ServerIndex />
                <Switch>
                    <Route path={`${path}/:serverId`}>
                        <Content />
                    </Route>
                    <Route path="/">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default Main;