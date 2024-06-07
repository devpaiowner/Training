import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { Routes } from '../constants/RouteConstants';

const RoleVerifyRoutes = () => {
    const profile  = useSelector((state: any) => state.GetProfileState);
    // console.log('profile--------------->', profile?.data?.data);

    return <Outlet/>
    // if (profile?.data?.data?.is_profile_complete === 1) {
    //     return (
    //         <>
    //             <Outlet />
    //             <Navigate to={Routes?.ProfileSetup} />
    //         </>
    //     )
    // } else {
    //     return (
    //         <Outlet />
    //     )
    // }
}

export default RoleVerifyRoutes