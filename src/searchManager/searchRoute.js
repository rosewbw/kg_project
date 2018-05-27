import React, {Component} from 'react';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import SearchPage from './searchPage';

const SearchRoute = (props) => (
    <Switch>
        <Route path={`${props.match.url}`} component={SearchPage}/>
    </Switch>
);


export default withRouter(SearchRoute);