import React, { useEffect } from 'react'
import { Images } from '../../../constants/ImageConstants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getDateHelper, showImage } from '../../../utils/Helper';
import { GetProfileAction } from '../../../redux/Action/AuthAction';
import Loader from '../../../components/Layouts/Loader';


const AccountInfo = () => {
    const dispatch = useDispatch<any>();
    const { data, loading } = useSelector((state: any) => state.GetProfileState);
    useEffect(() => {
        dispatch(GetProfileAction({}))
    }, [])
    return (
        <>
            {loading && <Loader />}
            <main className="main-content">
                <div className="manage-acc top-gap text-white">
                    <h1 className="com-heading mb-5">Account Info</h1>
                    <div className="head">
                        <div className="user-info">
                            <div className="pro-img">
                                <div className="pro-img-inner">
                                    <img src={showImage(data?.data?.profile_image)} alt="user img" />
                                </div>
                            </div>
                            <div className="pro-name">
                                <label className="name">Harmit Kaur</label>
                                <span className="id">harmitkaur@gmail.com</span>
                            </div>
                        </div>
                        <Link to="/account-info-edit" className="edit-btn"><i className="icon-edit d-block d-md-none"></i> <span className="d-none d-md-block">Edit Profile</span></Link>
                    </div>

                    <div className="">
                        <h3 className="com-heading-2 mb-4">Basic Information</h3>
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <label className="not-edit-input">
                                    <i className="icon-user-2"></i>
                                    <span className="txt">{data?.data?.full_name}</span>
                                </label>
                            </div>
                            <div className="col-md-6">
                                <label className="not-edit-input">
                                    <i className="icon-calendar"></i>
                                    <span className="txt">{getDateHelper({ date: data?.data?.dob })}</span>
                                </label>
                            </div>
                            <div className="col-md-6">
                                <label className="not-edit-input">
                                    <i className="icon-envelope"></i>
                                    <span className="txt">{data?.data?.email}</span>
                                </label>
                            </div>
                            <div className="col-md-6">
                                <label className="not-edit-input">
                                    <i className="icon-location"></i>
                                    <span className="txt">{data?.data?.address}</span>
                                </label>
                            </div>
                        </div>
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <h3 className="com-heading-2 my-4">Mobility Equipment</h3>
                                <div className="multi-label">
                                    {
                                        data?.data?.user_mobility_equipments?.length > 0 && data?.data?.user_mobility_equipments?.map((mobility: any, mobilityKey: any) => {
                                            return (
                                                <>
                                                    {mobility?.mobility_equipment?.title ? <label className="no-edit-label" key={mobilityKey}>{mobility?.mobility_equipment?.title}</label> : ''}
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h3 className="com-heading-2 my-4">Transfer Level </h3>
                                <label className="no-edit-label m-0 w-100">{data?.data?.user_transfer_levels?.transfer_level?.title} </label>
                                {/* <label className="no-edit-label m-0 w-100">Rides occupied in wheelchair </label> */}
                            </div>
                            <div className="col-md-12">
                                <label className="no-edit-label textarea-label w-100">{data?.data?.user_transfer_levels?.additional_message}</label>
                            </div>
                        </div>
                    </div>
                </div>


            </main>
        </>
    )
}

export default AccountInfo