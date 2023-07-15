import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReactBootstrapTableTLM from './ReactBootstrapTableTLM';


// const Second = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ './second')
// );


const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} />
      <Route
        path={`${match.url}/second`}
        render={(props) => <ReactBootstrapTableTLM {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
