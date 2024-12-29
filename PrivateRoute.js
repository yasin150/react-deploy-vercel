// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children, token }) => {
//   return token ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ role, children }) => {
//   const userRole = localStorage.getItem('role'); // Get role from localStorage

//   if (userRole !== role) {
//     // If the user doesn't have the correct role, redirect to a different route (user-dashboard)
//     return <Navigate to={userRole === 'user ' ? '/user-dashboard' : '/' } />;
//   }

//   return children; 
// };
// export default PrivateRoute;





import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ token, roles = [], children }) => {
  const userRole = localStorage.getItem('role')?.trim(); // .trim used for remove the space 
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(userRole)) {
    // Redirect to user-dashboard if role doesn't match
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }

  return children;
};

export default PrivateRoute;
