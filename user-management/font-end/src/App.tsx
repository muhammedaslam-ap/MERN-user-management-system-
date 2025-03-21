// import Signup from './components/signup/signup';
import { lazy, Suspense } from 'react';
const LazySignup  = lazy(()=>import('./components/signup/signup'))
import Login from './components/login/userLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Fixed name
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/user/home';
import PublicRoute from './protected/publicRouteUser';
import ProtectedRoute from "./protected/protectedRouteUser";
import ProfileInfo from './components/profileInfo/profileInfo';
import PublicRouteAdmin from './protected/publicRouteAdmin';
import ProtectedRouteAdmin from './protected/protectedRouteAdmin';
import AdminLogin from './pages/admin/login/login';
import AdminHome from './pages/admin/home/home'
import EditUser from './pages/admin/editUser/editUser';
import AddUser from './pages/admin/addUser/addUser'
function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/signup" element={  
            <PublicRoute>
              <Suspense fallback={
                <>
                <center> <h1>loading.... signup</h1></center>
                </>
              }>
                <LazySignup/>
              </Suspense>
              {/* <Signup /> */}
            </PublicRoute>
          }/>
          <Route path="/login" element={ 
            <PublicRoute>
              <Login />
            </PublicRoute>
          }/>
          <Route path="/" element={ 
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path='/user/profile' element={
            <ProtectedRoute>
              <ProfileInfo />
            </ProtectedRoute>
          }/>
           <Route
            path="/admin/login"
            element={
              <PublicRouteAdmin>
                <AdminLogin />
              </PublicRouteAdmin>
            }
          />
           <Route
            path="/admin/home"
            element={
              <ProtectedRouteAdmin>
                <AdminHome />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/admin/edituser/:id"
            element={
              <ProtectedRouteAdmin>
                <EditUser />
              </ProtectedRouteAdmin>
            }
           />
          <Route
            path="/admin/addUser"
            element={
              <ProtectedRouteAdmin>
                <AddUser />
              </ProtectedRouteAdmin>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
