import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Estilos = React.lazy(() =>
  import(/* webpackChunkName: "estilos" */ './estilos')
);

const EstilosMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/estilos`} />
      <Route
        path={`${match.url}/estilos`}
        render={(props) => <Estilos {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default EstilosMenu;
