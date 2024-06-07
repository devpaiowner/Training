import React, { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useLocation, useNavigate } from 'react-router-dom'
import { Routes } from '../../constants/RouteConstants'
import { getSearchQueryParams } from '../../utils/Helper'
import { UserRoleTypes, UserRoles } from '../../constants/Constants'
import { Images } from '../../constants/ImageConstants'
import { Config } from '../../config/Config'

const Main = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    // const role = getSearchQueryParams('role');

    useEffect(() => {
        if (Config?.IS_USER_LOGIN_TOKEN) {
            navigate(Routes?.BookRide)
        }
    }, [])

    // console.log('Config?.ACTIVE_ROLE',Config?.ACTIVE_ROLE);
    
    return (
        <main>
            <div className="auth-area">
                <div className="login-form-card row">
                    <div className="col-md-4 col-lg-6 lft d-none d-md-flex">
                        <img className="center-logo" src={Images?.LOGO_LARGE} alt="logo" />
                    </div>
                    <div className="col-md-8 col-lg-6 rght">
                        <div className="rght-inner">
                            <div className="head">
                                <h1>{Config?.ACTIVE_ROLE === UserRoleTypes?.Rider ? 'Welcome' : 'Sign up as a driver'}</h1>
                                <p>Enter your login details to access your account</p>
                            </div>
                            <ul className="nav nav-tabs" id="authTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${pathname === Routes?.Login && 'active'}`} onClick={() => navigate(Routes?.Login)} id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Login</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${pathname === Routes?.Register && 'active'}`} onClick={() => navigate(Routes?.Register)} id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">Sign Up</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="authTabContent">
                                <div className={`tab-pane fade  ${pathname === Routes?.Login && 'show active'}`} id="login" role="tabpanel" aria-labelledby="login-tab" >
                                    <Login />
                                </div>

                                <div className={`tab-pane fade signup ${pathname === Routes?.Register && 'show active'}`} id="signup" role="tabpanel" aria-labelledby="signup-tab">
                                    <Register />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#otpModal">
                    send otp
                </button> */}
            </div>
        </main>

    )
}

export default Main