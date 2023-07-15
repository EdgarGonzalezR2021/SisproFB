import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Combinaciones = React.lazy(() =>
  import(/* webpackChunkName: "combinaciones" */ './combinaciones')
);

const CombinacionesMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/combinaciones`}
      />
      <Route
        path={`${match.url}/combinaciones`}
        render={(props) => <Combinaciones {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default CombinacionesMenu;
