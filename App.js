// // import React ,{ useState }  from 'react'
// // import logo from './logo.svg';
// // import './App.css';
// // import './index.css';
// // import 'bootstrap/dist/css/bootstrap.css';
// // import Landingpage from './Landingpage';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Signup from './Signup';
// // import Login from './Login';




// // const App = () => {
// //   const [token, setToken] = useState('');
// //   const handleLogout = () => {
// //     setToken(null); 
// //     alert("Logout system!!")
// //   };

// //   return (
// //     <BrowserRouter> 
// //     <Routes >
// //       <Route path = '/' element={<Landingpage/>}></Route>
// //       <Route path = '/signup' element={<Signup/>}></Route>
// //       <Route path = '/login' element={<Login/>}  ></Route>
// //     </Routes>
// //      </ BrowserRouter >
// //   )
// // }

// // export default App







// // // import logo from './logo.svg';
// // // import './App.css';
// // // import './index.css';
// // // import 'bootstrap/dist/css/bootstrap.css';
// // // import Landingpage from './Landingpage';



// // // function App() {
// // //   return (
// // //     <div>
// // //       <Landingpage  />
// // //     </div>
// // //   );
// // // }

// // // export default App;






// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Landingpage from './Landingpage';
// import Signup from './Signup';
// import Login from './Login';
// import './App.css';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';
// // import Home from './Home';
// import Visitor from './Visitor';
// import Admin from './Admin';
// import Vote from './Vote';
// import Done from './Done';
// // import Logout from './Logout';






// const App = () => {
//   const [token, setToken] = useState(() => localStorage.getItem('token') || '');

//   const handleLogout = () => {
//     setToken('');
//     localStorage.removeItem('token');
//     alert("You have been logged out.");
   
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('token', token);
//     }
//   }, [token]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Landingpage  />} />
//         <Route path='/signup' element={<Signup setToken={setToken} />} />
//         <Route path='/login' element={<Login setToken={setToken} />} />
//         <Route path='/user-dashboard' element={<Visitor  />} />
//         <Route path='/admin-dashboard' element={<Admin  />} />
//         <Route path='/vote' element={<Vote token={token}  />}  />
//         <Route path='/done' element={<Done  onLogout={handleLogout}/>} />
        
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;




import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './Landingpage';
import Signup from './Signup';
import Login from './Login';
import Visitor from './Visitor';
import Admin from './Admin';
import Vote from './Vote';
import Done from './Done';
import PrivateRoute from './PrivateRoute'; 
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AdminResult from './AdminResult';
import AddMpa from './AddMpa';
import AddMna from './AddMna';
import ResultMna from './ResultMna';





const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  

  const handleLogout = () => {
    setToken('');
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have been logged out.');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.getItem('token',token);
    }
  }, [token]);
 
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Landingpage />} />
        <Route path='/signup' element={<Signup setToken={setToken}  />} />
        <Route path='/login' element={<Login setToken={setToken}  />} />

        {/* Private Routes */}
        <Route path='/user-dashboard'element={<PrivateRoute  token={token}  roles={['admin', '']} ><Visitor /></PrivateRoute>
          }
        />
        <Route path='/admin-dashboard'element={<PrivateRoute token={token} roles={['admin']}><Admin /></PrivateRoute>
          }
        />
        <Route path='/result'element={<PrivateRoute token={token} roles={['admin']}><AdminResult /></PrivateRoute>
          }
        />
        <Route path='/results'element={<PrivateRoute token={token} roles={['admin']}><ResultMna /></PrivateRoute>
          }
        />
        <Route path='/vote' element={<PrivateRoute token={token} roles={['','admin']}><Vote  token={token} onLogout={handleLogout} /></PrivateRoute>
          }
        />
        <Route path='/MPA'element={<PrivateRoute token={token} roles={['admin']}><AddMpa  /></PrivateRoute>
          }
        />
        <Route path='/MNA'element={<PrivateRoute token={token} roles={['admin']}><AddMna  /></PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
