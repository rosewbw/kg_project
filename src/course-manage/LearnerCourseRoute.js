import React, { Component } from 'react';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import { CourseList, CourseContent } from './index';

const LearnerCourseRoute = (props) => (
    <Switch>
        <Route path={`${props.match.url}/list`} component={CourseList}/>
        <Route path={`${props.match.url}/view`} component={CourseContent}/>
    </Switch>

);

export default withRouter(LearnerCourseRoute);