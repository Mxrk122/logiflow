import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute.jsx'

const App = () => {
  const isAuthenticated = true

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
  )
}

export default App
