import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import SavedFav from './SaveFav'
import ChangePassword from './ChangePassword'
import AboutArea from './AboutArea'
import FaqArea from './FaqsArea'
import PrivacyPolicy from './PrivacyPolicy'
import TermsConditions from './TermsConditions'
import { Images } from '../../../constants/ImageConstants'
import { logoutHelper } from '../../../utils/Helper'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteAccountAction, GetProfileAction, UpdateNotificationStatusAction } from '../../../redux/Action/AuthAction'
import { Routes } from '../../../constants/RouteConstants'
import Loader from '../../../components/Layouts/Loader'


const Settings = () => {

    const dispatch = useDispatch<any>();
    const { hash } = useLocation();
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState<any>('');
    const [isClicked, setIsClicked] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const profile = useSelector((state: any) => state.GetProfileState);
    const deleteAccount = useSelector((state: any) => state.DeleteAccountState);

    const sidebarToggle = () => {
        setIsClicked(!isClicked);
    };

    const handleItemClick = (componentName: string) => {
        setActiveComponent(componentName);
        navigate(Routes?.SettingsLayout + '#' + componentName)
    };

    const handleChangeNotificationStatus = async (e: any) => {
        const status = e?.target?.checked;
        await dispatch(UpdateNotificationStatusAction({ status_notification: status ? 1 : 0 }))
        dispatch(GetProfileAction({}))
    }

    const handleVerifyRide = () => {
        // dispatch(UpdateNotificationStatusAction({ status_notification: status }))

    }

    useEffect(() => {
        if (hash) {
            setActiveComponent(hash?.split('#')?.pop())
        }
        else {
            setActiveComponent('ChangePassword')
        }
    }, [hash])

    const handleDeleteAccount = () => {
        if (profile?.data?.data?.social_type === "GOOGLE") {
            setPasswordError('')
            dispatch(DeleteAccountAction({
                email: profile?.data?.data?.email,
                password: deletePassword,
                device_type: 'Web'
            }))
        } else {
            if (deletePassword?.trim()?.length === 0) {
                setPasswordError('Password is required')
            }
            else {
                setPasswordError('')
                dispatch(DeleteAccountAction({
                    email: profile?.data?.data?.email,
                    password: deletePassword,
                    device_type: 'Web'
                }))
            }
        }
    }

    useEffect(() => {
        if (deleteAccount?.status) {
            logoutHelper()
        } else if (deleteAccount?.error) {
            setPasswordError(deleteAccount?.error?.message)
            setDeletePassword('')
            $('#accountSureDeleteModal').click()
            dispatch(DeleteAccountAction('RESET'))
        }
    }, [deleteAccount])

    return (
        <>
            {(profile?.loading || deleteAccount?.loading) && <Loader />}
            <main className="main-content">
                <div className='setting-layout top-gap'>
                    <div className='container-fluid'>
                        <div className={`close-side-btn ${isClicked ? 'show' : ''}`} onClick={sidebarToggle}><i className='icon-settings'></i></div>
                        <div className='setting-row'>
                            {/* <div className='setting-sidebar'> */}
                            <div className={`setting-sidebar ${isClicked ? 'open' : ''}`}>
                                <div className='single-item'>
                                    <i className='icon-bell menu-icon'></i>
                                    <span>Notifications </span>
                                    <div className="form-check form-switch ms-auto">
                                        <input className="form-check-input" type="checkbox" onChange={handleChangeNotificationStatus} checked={profile?.data?.data?.status_notification} />
                                    </div>
                                </div>
                                <div className='single-item'>
                                    <i className='icon-shield menu-icon'></i>
                                    <span>Verify the Ride </span>
                                    <div className="form-check form-switch ms-auto">
                                        <input className="form-check-input" type="checkbox" />
                                    </div>
                                </div>
                                <div className='single-item' onClick={() => handleItemClick('ChangePassword')}>
                                    <i className='icon-lock menu-icon'></i>
                                    <span>Change Password</span>
                                    <i className='icon-chev-right arr'></i>
                                </div>
                                <div className='single-item' onClick={() => handleItemClick('AboutArea')}>
                                    <i className='icon-exclamation menu-icon'></i>
                                    <span>About</span>
                                    <i className='icon-chev-right arr'></i>
                                </div>
                                <div className='single-item' onClick={() => handleItemClick('FaqArea')}>
                                    <i className='icon-question menu-icon'></i>
                                    <span>FAQ's</span>
                                    <i className='icon-chev-right arr'></i>
                                </div>
                                <div className='single-item' onClick={() => handleItemClick('SavedFav')}>
                                    <i className='icon-heart menu-icon'></i>
                                    <span>Saved as a Favourite</span>
                                    <i className='icon-chev-right arr'></i>
                                </div>
                                <div className='single-item' onClick={() => handleItemClick('PrivacyPolicy')}>
                                    <i className='icon-shield menu-icon'></i>
                                    <span>Privacy Policy</span>
                                    <i className='icon-chev-right arr'></i>
                                </div>
                                <div className='single-item' onClick={() => handleItemClick('TermsConditions')}>
                                    <i className='icon-file menu-icon'></i>
                                    <span>Terms & Conditions</span>
                                    <i className='icon-chev-right arr'></i>
                                </div>
                                {/* <button className='single-item' id='accountSureDeleteModal' data-bs-toggle="modal" data-bs-target={profile?.data?.data?.social_type === "GOOGLE" ? "#sureDeleteModal" : "#deleteAccModal"}> */}
                                <button className='single-item' id='accountSureDeleteModal' data-bs-toggle="modal" data-bs-target="#deleteAccModal" >
                                    <i className='icon-delete menu-icon'></i>
                                    <span>Delete Account</span>
                                    <i className='icon-chev-right arr'></i>
                                </button>
                                <button className='single-item' data-bs-toggle="modal" data-bs-target="#logoutModal">
                                    <i className='icon-logout menu-icon'></i>
                                    <span>Logout</span>
                                    <i className='icon-chev-right arr'></i>
                                </button>
                            </div>
                            <div className='setting-rght'>

                                {activeComponent === 'SavedFav' && <SavedFav />}
                                {activeComponent === 'ChangePassword' && <ChangePassword />}
                                {activeComponent === 'AboutArea' && <AboutArea />}
                                {activeComponent === 'FaqArea' && <FaqArea />}
                                {activeComponent === 'PrivacyPolicy' && <PrivacyPolicy />}
                                {activeComponent === 'TermsConditions' && <TermsConditions />}
                            </div>

                        </div>


                    </div>
                </div>


                <div className="modal fade com-modal" id="deleteAccModal" tabIndex={-1} aria-labelledby="deleteAccModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content px-5">
                            <div className="modal-header border-0">
                                <h1 className="modal-title" id="deleteAccModalLabel">Delete Account</h1>
                            </div>
                            <div className="modal-body">
                                <img className='mb-4 mx-auto d-block' src={Images?.DeleteAccImg} alt="" />
                                <p className='mb-5 text-center text-white'>Enter your password to delete your account</p>
                                <div className="com-floating mb-0 ">
                                    <div className='position-relative'>
                                        <i className="f-icon icon-lock"></i>
                                        <label className="f-label">Password</label>
                                        <input className="f-input" type="password" placeholder="Password" onChange={(e) => setDeletePassword(e?.target?.value)} value={deletePassword} />
                                    </div>
                                    <p className='input-error'>{passwordError}</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className='row w-100'>
                                    <div className='col-6 ps-0'>
                                        <button type="button" className="com-btn gray-btn w-100 m-0" data-bs-dismiss="modal">No</button>
                                    </div>
                                    <div className='col-6 pe-0'>
                                        {/* <button type="button" className="com-btn w-100 m-0" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#sureDeleteModal">Yes</button> */}

                                        {
                                            deletePassword?.trim()?.length > 0 ?
                                                // passwordError ?
                                                <button type="button" className="com-btn w-100 m-0" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#sureDeleteModal">Yes</button>
                                                :
                                                <button type="button" className="com-btn w-100 m-0" onClick={handleDeleteAccount}>Yes</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade com-modal com-modal-small" id="sureDeleteModal" tabIndex={-1} aria-labelledby="sureDeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content px-4">
                            <div className="modal-body">
                                <p className='mb-2 text-center text-white'>Are you sure you want to delete <br /> the account ?</p>
                            </div>
                            <div className="modal-footer mt-4">
                                <div className='row w-100'>
                                    <div className='col-6 ps-0'>
                                        <button type="button" className="com-btn gray-btn w-100 m-0" data-bs-dismiss="modal">No</button>
                                    </div>
                                    <div className='col-6 pe-0'>
                                        <button type="button" className="com-btn w-100 m-0" data-bs-dismiss="modal" onClick={handleDeleteAccount}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade com-modal com-modal-small" id="logoutModal" tabIndex={-1} aria-labelledby="logoutModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content px-4">
                            <div className="modal-body">
                                <p className='mb-2 text-center text-white'>Are your sure you want to <br /> log out your account ?</p>
                            </div>
                            <div className="modal-footer mt-4">
                                <div className='row w-100'>
                                    <div className='col-6 ps-0'>
                                        <button type="button" className="com-btn gray-btn w-100 m-0" data-bs-dismiss="modal">No</button>
                                    </div>
                                    <div className='col-6 pe-0'>
                                        <button type="button" className="com-btn w-100 m-0" data-bs-dismiss="modal" onClick={logoutHelper}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </main>
        </>
    )
}

export default Settings