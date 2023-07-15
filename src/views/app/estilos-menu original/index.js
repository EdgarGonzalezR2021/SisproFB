import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import IconCards from 'containers/ui/IconCards';
// import UserCardExamples from 'containers/ui/UserCardExamples';
// import Estilos from './menu-estilos/estilos';
// import Combinaciones from './combinaciones';

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
