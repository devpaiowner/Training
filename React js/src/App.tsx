import React from 'react';
import './Assets/scss/style.scss';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes as GlobalRoutes } from './constants/RouteConstants';
import Home from './pages/Home/Home';
import Layout from './components/Layouts/Layout';
import Main from './pages/Auth/Main';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOtp from './pages/Auth/VerifyOtp';
import PhoneVerify from './pages/Auth/PhoneVerify';
import ResetPassword from './pages/Auth/ResetPassword';
import ProfileSetup from './pages/Rider/ProfileSetup/Profile';
import Notifications from './pages/Rider/Notifications';
import AccountInfo from './pages/Rider/ProfileSetup/AccountInfo';
import AccountInfoEdit from './pages/Rider/ProfileSetup/AccountInfoEdit';
import SettingsLayout from './pages/Rider/Settings/SettingsLayout';
import BookRide from './pages/Rider/BookRide/BookRide';
import RideType from './pages/Rider/BookRide/RideType';
import MyRides from './pages/Rider/MyRides/MyRides';

import DriverForm from './pages/Driver/DriverForm';
import PrivateRoutes from './router/PrivateRoutes';
import EmailVerification from './pages/Rider/ProfileSetup/EmailVerification';
import Map from './components/map/Map';
import RoleVerifyRoutes from './router/RoleVerifyRoutes';



function App() {

  /*==== Private routes start ====*/
  const privateRoutes = [
    {
      path: GlobalRoutes?.ProfileSetup,
      element: <ProfileSetup />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.Notifications,
      element: <Notifications />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.AccountInfo,
      element: <AccountInfo />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.AccountInfoEdit,
      element: <AccountInfoEdit />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.SettingsLayout,
      element: <SettingsLayout />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.BookRide,
      element: <BookRide />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.RideType,
      element: <RideType />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.MyRides,
      element: <MyRides />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.Map,
      element: <Map />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.DriverForm,
      element: <DriverForm />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.EmailVerification,
      element: <EmailVerification />,
      requireAuth: false,
    },
  ];
  /*==== Private routes end ====*/


  /*==== Public routes start ====*/
  const publicRoutes = [
    {
      path: GlobalRoutes?.Home,
      element: <Home />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.Login,
      element: <Main />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.Register,
      element: <Main />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.ForgotPassword,
      element: <ForgotPassword />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.VerifyOtp,
      element: <VerifyOtp />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.PhoneVerify,
      element: <PhoneVerify />,
      requireAuth: false,
    },
    {
      path: GlobalRoutes?.ResetPassword,
      element: <ResetPassword />,
      requireAuth: false,
    }
  ];
  /*==== Public routes end ====*/

  return (
    <Router>
    <Routes>
      <Route element={<RoleVerifyRoutes />}>
        { /*==== Private routes start ====*/}
        <Route element={<PrivateRoutes component={Layout} />}>
          {
            privateRoutes?.map((route, routeKey) => {
              return <Route path={route?.path} element={route?.element} key={routeKey} />
            })
          }
        </Route>
        { /*==== Private routes end ====*/}

        { /*==== Public routes start ====*/}
        <Route element={<Layout />}>
          {
            publicRoutes?.map((route, routeKey) => {
              return <Route path={route?.path} element={route?.element} key={routeKey} />
            })
          }
        </Route>
        { /*==== Public routes end ====*/}
        
      </Route>
    </Routes>
  </Router>

  );
}

export default App;
