import React, { FC } from 'react'
import { Navigate } from 'react-router';
import { Routes } from '../constants/RouteConstants';
import { useSelector } from 'react-redux';
import { UserRoleTypes, UserRoles } from '../constants/Constants';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const { pathname } = useLocation();
    const { data } = useSelector((state: any) => state.GetProfileState);

    if (localStorage.getItem('isUserLoginToken')) {
        if (data?.data?.role_id === UserRoleTypes?.Rider) {            
            if (data?.data?.is_profile_complete === 0) {
                return (
                    <>
                        <Component />
                        <Navigate to={Routes?.PhoneVerify} />
                    </>
                )
            } else if (data?.data?.is_profile_complete === 1) {
                if (pathname !== Routes?.ProfileSetup) {
                    toast.error('Please setup your profile first.')
                }

                return (
                    <>
                        <Component />
                        <Navigate to={Routes?.ProfileSetup} />
                    </>
                )

            }
            // if (data?.data?.is_profile_complete === 1 || data?.data?.is_profile_complete === 0) {
            //     if (pathname !== Routes?.ProfileSetup) {
            //         toast.error('Please setup your profile first.')
            //     }
            //     return (
            //         <>
            //             <Component />
            //             <Navigate to={Routes?.ProfileSetup} />
            //         </>
            //     )
            // }
            else {
                return <Component />;
            }
        } else {
            return <Component />;
        }

        // return <Component />;
    }
    else {
        return <Navigate to={Routes?.Home} />;
    }
};

export default PrivateRoute;



// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import { Config } from '../config/Config'
// import Login from '../pages/Auth/Login'
// import { Navigate } from 'react-router';
// import { Routes } from '../constants/RouteConstants';

// const PrivateRoutes = () => {  
//   if (localStorage.getItem('isUserLoginToken')) {
//     // if (Config?.IS_USER_LOGIN_TOKEN) {
//     return <Outlet />
//   } else {
//     return <Navigate to={Routes?.Home} />
//   }
// }

// export default PrivateRoutes