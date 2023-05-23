// Importa los módulos necesarios
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute.jsx';
import Main from '../routes/Main'

// Componente principal
const App = () => {
  const isAuthenticated = true; // Cambia esto con tu lógica de autenticación

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

export default App;
