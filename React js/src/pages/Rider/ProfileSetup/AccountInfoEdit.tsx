import React, { useEffect, useState } from 'react'
import { Images } from '../../../constants/ImageConstants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm } from 'react-hook-form';
import { appendToArray, appendToString, arrayToString, getLocationAddress, pluck, removeFromArray, removeFromString, showImage } from '../../../utils/Helper';
import LocationInputField from '../../../components/map/LocationInputField';
import { GetMobilityEquipmentAction, GetProfileAction, GetTransferLevelsAction, ProfileSetupAction, UpdateProfileImageAction } from '../../../redux/Action/AuthAction';
import SkeletonLoader from '../../../components/UI/SkeletonLoader';
import Button from '../../../components/UI/Button';

interface IProfileFormInputs {
    email: string;
    full_name: string;
    profile_image: string;
    dob: string;
    mobile_number: string | number;
    country_code: string | number;
    address: string;
    transfer_level_message: string;
    mobility_equipment_ids: any;
    transfer_level_id: any;
};

const AccountInfoEdit = () => {

    const dispatch = useDispatch<any>();
    const { data, status } = useSelector((state: any) => state.GetProfileState);
    const mobilityEquipments = useSelector((state: any) => state.GetMobilityEquipmentState);
    const transferLevels = useSelector((state: any) => state.GetTransferLevelsState);
    const updateProfile = useSelector((state: any) => state.ProfileSetupState);
    const updateProfileImage = useSelector((state: any) => state.UpdateProfileImageState);


    const { register, watch, setValue, formState: { errors }, handleSubmit } = useForm<IProfileFormInputs>({
        mode: 'onChange',
        // resolver: yupResolver(LoginValidation),
    });

    useEffect(() => {
        if (status) {
            setValue('full_name', data?.data?.full_name)
            setValue('email', data?.data?.email)
            setValue('dob', data?.data?.dob)
            setValue('country_code', data?.data?.country_code)
            setValue('mobile_number', data?.data?.mobile_number)
            setValue('address', data?.data?.address)

            let mobility_equipments = []
            if (data?.data?.user_mobility_equipments?.length > 0) {
                mobility_equipments = pluck(data?.data?.user_mobility_equipments, 'equipment_id')
            }
            setValue('mobility_equipment_ids', mobility_equipments)

            setValue('transfer_level_id', data?.data?.user_transfer_levels?.transfer_level_id)
            setValue('transfer_level_message', data?.data?.user_transfer_levels?.additional_message)
        }
    }, [status])

    const handleMobileNumber = () => {

    }

    const handleFetchCurrentLocation = async () => {
        const address = await getLocationAddress({ type: 'current' });

    };

    const handleLocationSuccess = (result: any) => {
        // appendToKeyInObject({ obj: setProfileForm, key: 'address', value: result?.formattedAddress });
    }


    useEffect(() => {
        dispatch(GetMobilityEquipmentAction({}));
        dispatch(GetTransferLevelsAction({}));
    }, [])

    const handleSelectEquipment = (id: string | number, type: any) => {
        const isSelected = watch('mobility_equipment_ids')?.includes(id);
        let updatedSelectedEquipments;
        if (isSelected) {
            updatedSelectedEquipments = removeFromArray({ array: watch('mobility_equipment_ids'), value: id })
        } else {
            updatedSelectedEquipments = appendToArray({ array: watch('mobility_equipment_ids'), value: id })
        }
        setValue('mobility_equipment_ids', updatedSelectedEquipments);
    }

    const handleSelectTransferLevel = (id: any) => {
        setValue('transfer_level_id', id)
    }

    const handleSelectImage = async (e: any) => {
        const imageFile = e?.target?.files[0];
        await dispatch(UpdateProfileImageAction({ profile_image: imageFile }));
        dispatch(GetProfileAction({}));
    }

    const onSubmit = (payload: IProfileFormInputs) => {
        payload.mobility_equipment_ids = arrayToString(payload?.mobility_equipment_ids)
        dispatch(ProfileSetupAction(payload))
    }

    return (
        <main className="main-content">
            <div className="manage-acc top-gap text-white">
                {/* <div className="row gx-0 gx-md-5"> */}
                <form className="row gx-0 gx-md-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12">
                        <Link to="/account-info" className="back-btn"><i className="icon-chev-right"></i> Edit Profile</Link>
                    </div>
                    <div className="col-md-6">
                        <div className="head">
                            <div className="user-info">
                                <div className="pro-img">
                                    <div className="pro-img-inner">
                                        <img src={showImage(data?.data?.profile_image)} alt="" />
                                    </div>
                                    <input
                                        className="d-none"
                                        type="file"
                                        id="choose-photo"
                                        onChange={handleSelectImage}
                                        accept="image/jpeg,image/jpg,image/png"
                                    />
                                    <label className="choose-img-btn" htmlFor="choose-photo"><i className="icon-edit"></i></label>
                                </div>
                                <div className="pro-name">
                                    <label className="name">{data?.data?.full_name}</label>
                                    <span className="id">{data?.data?.email}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="com-heading-2 mb-4">Basic Information</h3>
                            <div className="com-floating mb-5">
                                <i className="f-icon icon-user-2"></i>
                                <label className="f-label main-gray-bg">Name</label>
                                <input className="f-input" type="text" placeholder="Enter name" {...register('full_name')} />
                            </div>

                            <div className="com-floating mb-5">
                                <i className="f-icon icon-envelope"></i>
                                <label className="f-label main-gray-bg">Email</label>
                                <input className="f-input" type="text" placeholder="Enter email" {...register('email')} />
                            </div>

                            <div className="com-floating date-filed mb-5">
                                <i className="f-icon icon-calendar"></i>
                                <label className="f-label main-gray-bg">DOB</label>
                                <ReactDatePicker
                                    {...register('dob')}
                                    isClearable={false}
                                    selected={data?.data?.dob}
                                    className='f-input'
                                    // onChange={(date: any) => handleSetFormValue('dob', setDateHelper({date}), 'dob')}
                                    onChange={() => { }}
                                    onKeyDown={(e: any) => e.preventDefault()}
                                    placeholderText='MM/DD/YYYY'
                                    showYearDropdown
                                />
                            </div>

                            <div className="com-floating mb-5">
                                <label className="f-label main-gray-bg">Phone</label>
                                <PhoneInput
                                    inputClass="f-input w-100"
                                    placeholder=""
                                    disableInitialCountryGuess={false}
                                    enableLongNumbers={false}
                                    country={"us"}
                                    countryCodeEditable={false}
                                    value={`${watch('country_code')}${watch('mobile_number')}`}
                                    onChange={handleMobileNumber}
                                />
                            </div>

                            <div className="com-floating mb-5">
                                <i className="f-icon icon-location"></i>
                                <label className="f-label main-gray-bg">Address</label>
                                <LocationInputField
                                    label="Location*"
                                    placeholder='Enter Address'
                                    value={watch('address')}
                                    onSuccess={handleLocationSuccess}
                                    onChange={(e: any) => setValue('address', e?.target?.value)}
                                />
                                <i className="f-pass icon-pickup" onClick={handleFetchCurrentLocation}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="com-heading-2 mb-4">Mobility Equipment</h3>
                        {
                            mobilityEquipments?.loading ?
                                <SkeletonLoader count={10} /> :
                                mobilityEquipments?.data?.data?.length > 0 && mobilityEquipments?.data?.data?.map((mobility: any, mobilityKey: any) => {

                                    return (
                                        <div className="form-check com-check-outline mb-3" key={mobilityKey}>
                                            <input className="form-check-input" type="checkbox" id={mobility?.id + '_mobility_equipments'} onChange={(e) => handleSelectEquipment(mobility?.id, e?.target?.checked)} checked={watch('mobility_equipment_ids')?.includes(Number(mobility?.id))} />
                                            <label className="form-check-label golden-text" htmlFor={mobility?.id + '_mobility_equipments'}>{mobility?.title}</label>
                                        </div>
                                    )
                                })
                        }

                        <div>
                            <h5 className="transfer-heading mt-5 mb-4">Transfer Level </h5>
                            {
                                transferLevels?.loading ?
                                    <SkeletonLoader count={2} /> :
                                    transferLevels?.data?.data?.length > 0 && transferLevels?.data?.data?.map((tLevel: any, key: any) => {
                                        return (
                                            <>
                                                <div className="form-check com-radio mb-3" key={key}>
                                                    <input className="form-check-input" type="radio" id={tLevel?.id + '_transfer_Levels'} onChange={(e) => handleSelectTransferLevel(tLevel?.id)} checked={watch('transfer_level_id') === Number(tLevel?.id)} />
                                                    <label className="form-check-label golden-text" htmlFor={tLevel?.id + '_transfer_Levels'}>{tLevel?.title} </label>
                                                </div>
                                            </>
                                        )
                                    })
                            }
                            <textarea className="com-input h-auto mt-4 resize-none" rows={4} placeholder="Additional message" value={watch('transfer_level_message')} onChange={(e) => setValue('transfer_level_message', e?.target?.value)}></textarea>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <Button text='Update Profile' className="com-btn w-75" type='submit' isLoading={updateProfile?.loading} />
                    </div>
                </form>
                {/* </div> */}
            </div>


        </main>
    )
}

export default AccountInfoEdit