import React, { useEffect, useState } from 'react'
import { Config } from '../../config/Config';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '../../constants/RouteConstants';
import { getSearchQueryParams, saveToStorage, showImage } from '../../utils/Helper';
import { StorageConstants, UserRoleTypes, UserRoles } from '../../constants/Constants';
import ToastDefault from './Toast';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfileAction } from '../../redux/Action/AuthAction';

const Header = () => {
    const dispatch = useDispatch<any>();
    const profile = useSelector((state: any) => state.GetProfileState);

    useEffect(() => {
        if (Config?.IS_USER_LOGIN_TOKEN) {
            dispatch(GetProfileAction({}))
        }
    }, [])

    const handleRole = (role: number) => {
        const payload = {
            key: 'role',
            value: role,
        }
        saveToStorage(payload);
    }

    useEffect(() => {
        if (profile?.status) {
            saveToStorage({ key: StorageConstants?.USER_DETAIL, value: profile?.data?.data })
        }
    }, [profile?.status])

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={Routes?.Home}>
                            <img src="images/main-logo.svg" />
                        </Link>
                        {
                            Config?.IS_USER_LOGIN_TOKEN ?
                                <>
                                    <button className="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ms-auto">
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"><i className="icon-car"></i>Book Ride</a>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/my-rides"><i className="icon-ride"></i> My Rides</Link>
                                            </li>
                                            <li className="nav-item header-dropdown">
                                                <div className="dropdown-btn" >
                                                    <div className="drop-img">
                                                        {
                                                            profile?.data?.data?.profile_image ?
                                                                <img src={showImage(profile?.data?.data?.profile_image)} alt="" />
                                                                :
                                                                <i className="icon-user-2"></i>
                                                        }
                                                    </div>
                                                    <div>
                                                        <span className="drop-name">{profile?.data?.data?.name}</span>
                                                        <span className="drop-id">{profile?.data?.data?.email}</span>
                                                    </div>
                                                    <i className="arw icon-chev-btm"></i>

                                                    <ul className="drop-list">
                                                        <li>
                                                            <Link to="#"><i className="icon-wallet"></i><span className="txt">Wallet <i className="arw-next icon-chev-right"></i></span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#"><i className="icon-support"></i><span className="txt">Support <i className="arw-next icon-chev-right"></i></span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/account-info"><i className="icon-user"></i><span className="txt">Manage Account <i className="arw-next icon-chev-right"></i></span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#"><i className="icon-heart"></i><span className="txt">Saved as a Favourite <i className="arw-next icon-chev-right"></i></span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/settings"><i className="icon-settings"></i><span className="txt">Settings <i className="arw-next icon-chev-right"></i></span></Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link head-notify" to="/notifications">
                                                    <i className="icon-bell m-0"></i>
                                                    <span className="dot"></span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                                :
                                <div className="sign-up-btns ms-auto">
                                    {/* {
                                        Config?.ACTIVE_ROLE === UserRoleTypes?.Rider ?
                                            <Link onClick={() => handleRole(UserRoleTypes?.Driver)} className="com-btn" to={`${Routes?.Register}`}>Sign up as Driver</Link>
                                            : */}
                                    <Link onClick={() => handleRole(UserRoleTypes?.Rider)} className="com-btn lh-auto" to={Routes?.Register}>Sign up as Rider</Link>
                                    {/* } */}
                                </div>
                        }
                    </div>
                </nav>
            </header>
            <ToastDefault />
        </>
    )
}

export default Header