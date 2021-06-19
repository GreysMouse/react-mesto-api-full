import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import IsLoggedInContext from '../contexts/IsLoggedInContext';

function ProtectedRoute(props) {
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <Route>
      {isLoggedIn ? props.children : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;