import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import About from './modules/About';

// const Second = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ './second')
// );
const Second = React.lazy(() => import('./second'));

const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} />
      <Route
        path={`${match.url}/second`}
        render={(props) => <Second {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default SecondMenu;
// <Route path="/about" component={About}/>
