import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { CourseList, CourseContent, NoCurrentLesson } from './index';

const LearnerCourseRoute = props => (
  <Switch>
    <Route path={`${props.match.url}/list`} component={CourseList} />
    <Route
      path={`${props.match.url}/view`}
      render={routeProps => {
        const lessonId = routeProps.location.state.lessonId;
        if (lessonId) {
          return (
            <CourseContent
              updateCurrentLesson={props.updateCurrentLesson}
              projectId={lessonId}
            />
          );
        } else {
          return <NoCurrentLesson />;
        }
      }}
    />
  </Switch>
);

export default withRouter(LearnerCourseRoute);
