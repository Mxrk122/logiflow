// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// import PropTypes from 'prop-types'

// const PrivateRoute = ({ comp, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated ? (
//         <comp {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// )

// PrivateRoute.PropTypes = {
//     comp: PropTypes.element,
//     isAuthenticated: PropTypes.bool
// }

// PrivateRoute.defaultProps = {
//   comp: null,
//   isAuthenticated: false
// }

// export default PrivateRoute

import React from 'react'

const PrivateRoute = () => (
  <h1>Private Route</h1>
)

export default PrivateRoute
