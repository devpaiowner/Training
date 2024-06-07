import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetMobilityEquipmentAction, GetProfileAction, GetTransferLevelsAction, ProfileSetupAction, UpdateProfileImageAction } from '../../../redux/Action/AuthAction';
import { appendToArray, appendToKeyInObject, appendToString, arrayToString, getCurrentDateHelper, getDateHelper, getLocationAddress, pluck, removeFromArray, removeFromString, setDateHelper, showImage } from '../../../utils/Helper';
import Button from '../../../components/UI/Button';
import DatePicker from 'react-datepicker';
import ValidationMessage from '../../../constants/Validation/ValidationMessage';
import SkeletonLoader from '../../../components/UI/SkeletonLoader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../constants/RouteConstants';
import LocationInputField from '../../../components/map/LocationInputField';
import { useForm } from 'react-hook-form';

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

const ProfileSetup = () => {

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [profileForm, setProfileForm]: any = useState({});
    const [profileImage, setProfileImage]: any = useState();

    const mobilityEquipments = useSelector((state: any) => state.GetMobilityEquipmentState);
    const transferLevels = useSelector((state: any) => state.GetTransferLevelsState);
    const profileSetup = useSelector((state: any) => state.ProfileSetupState);
    const updateProfileImage = useSelector((state: any) => state.UpdateProfileImageState);
    const profile = useSelector((state: any) => state.GetProfileState);

    const { register, watch, setValue, formState: { errors }, handleSubmit } = useForm<IProfileFormInputs>({
        mode: 'onChange',
        // resolver: yupResolver(LoginValidation),
    });

    useEffect(() => {
        dispatch(GetMobilityEquipmentAction({}));
        dispatch(GetTransferLevelsAction({}));
    }, [])

    const handleSelectEquipment = (id: string | number, type: any) => {
        // const isSelected = selectedEquipments.includes(String(id));
        // let updatedSelectedEquipments;
        // if (isSelected) {
        //     updatedSelectedEquipments = removeFromString({ string: selectedEquipments, value: id })
        // } else {
        //     updatedSelectedEquipments = appendToString({ string: selectedEquipments, value: id })
        // }
        // setSelectedEquipments(updatedSelectedEquipments);
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
        dispatch(GetProfileAction({}))
    }

    const handleFetchCurrentLocation = async () => {
        const address: any = await getLocationAddress({ type: 'current' });
        appendToKeyInObject({ obj: setProfileForm, key: 'address', value: address?.address });
        // setCustomErrors({ ...customErrors, address: '' })
    };

    const handleLocationSuccess = (result: any) => {
        appendToKeyInObject({ obj: setProfileForm, key: 'address', value: result?.formattedAddress });
    }



    useEffect(() => {
        if (profile?.status) {
            setProfileImage(profile?.data?.data?.profile_image)
            dispatch(UpdateProfileImageAction('RESET'))

            setValue('dob', getDateHelper({ date: profile?.data?.data?.dob }))
            setValue('full_name', profile?.data?.data?.full_name)
            setValue('country_code', profile?.data?.data?.country_code)
            setValue('mobile_number', profile?.data?.data?.mobile_number)
            setValue('email', profile?.data?.data?.email)
            setValue('address', profile?.data?.data?.address)

            let mobility_equipments = []
            if (profile?.data?.data?.user_mobility_equipments?.length > 0) {
                mobility_equipments = pluck(profile?.data?.data?.user_mobility_equipments, 'equipment_id')
            }
            setValue('mobility_equipment_ids', mobility_equipments)

            setValue('transfer_level_id', profile?.data?.data?.user_transfer_levels?.transfer_level_id)
            setValue('transfer_level_message', profile?.data?.data?.user_transfer_levels?.additional_message)


            // appendToKeyInObject({ obj: setProfileForm, key: 'email', value: profile?.data?.data?.email })

            // appendToKeyInObject({ obj: setProfileForm, key: 'country_code', value: profile?.data?.data?.country_code })
            // appendToKeyInObject({ obj: setProfileForm, key: 'mobile_number', value: profile?.data?.data?.mobile_number })

        }
        // if (profile?.status) {
        //     setProfileImage(profile?.data?.data?.profile_image)
        //     dispatch(UpdateProfileImageAction('RESET'))
        // } else {
        //     appendToKeyInObject({ obj: setProfileForm, key: 'email', value: profile?.data?.data?.email })
        //     if (profile?.data?.data?.profile_image) {
        //         setProfileImage(profile?.data?.data?.profile_image)
        //     }
        // }
    }, [profile?.status])

    const handleMobileNumber = (value: any, code: any) => {
        const regex = new RegExp(code?.dialCode);
        const phone = value.replace(regex, "");

        setValue('country_code', code?.dialCode)
        setValue('mobile_number', phone)
    }

    useEffect(() => {
        if (profile?.data?.data?.is_profile_complete === 2) {
            // navigate(Routes?.Home)
        }
    }, [profile?.status])

    useEffect(() => {
        if (profileSetup?.status) {
            const fetch = async () => {
                await dispatch(GetProfileAction({}))
                navigate(Routes?.BookRide)
            }
            fetch()
        }
    }, [profileSetup?.status])


    const onSubmit = (payload: IProfileFormInputs) => {
        // payload.mobility_equipment_ids = arrayToString(payload?.mobility_equipment_ids)
        console.log('payload--------------->', payload);

    }
    return (
        <main className="main-content">
            <div className="profile-setup-card text-white">
                <h1 className="ttl">Profile Setup</h1>
                {/* <div className="row gx-5 gy-3"> */}
                <form className="row gx-5 gy-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="profile-img-area">
                            <div className="pro-img">
                                <div className="pro-img-inner">
                                    {
                                        profileImage ?
                                            <img src={showImage(profileImage)} alt="user img" />
                                            :
                                            <i className="icon-user-2"></i>
                                    }
                                </div>
                            </div>
                            <div className="img-btn">
                                <input
                                    className="d-none"
                                    id="choose-photo"
                                    type="file"
                                    onChange={handleSelectImage}
                                    accept="image/jpeg,image/jpg,image/png"
                                />
                                <label htmlFor="choose-photo"><i className="icon-edit"></i> Add Photo</label>
                            </div>
                        </div>

                        <div>
                            <h3 className="inner-title">Basic Information</h3>
                            <div className="com-floating">
                                <div className='position-relative'>
                                    <i className="f-icon icon-user-2"></i>
                                    <label className="f-label">Name</label>
                                    <input
                                        className="f-input"
                                        type="text"
                                        placeholder="Enter name"
                                        {...register('full_name')}
                                    />
                                </div>

                                {/* <p className='input-error'>{customErrors?.full_name}</p> */}
                            </div>

                            <div className="com-floating">
                                <div className='position-relative'>
                                    <i className="f-icon icon-envelope"></i>
                                    <label className="f-label">Email</label>
                                    <input
                                        className="f-input"
                                        type="text"
                                        placeholder="Enter email"
                                        readOnly
                                        {...register('email')}
                                    />
                                    <i className="f-pass icon-edit" onClick={() => navigate(Routes?.EmailVerification, { state: { email: profileForm?.email } })}></i>
                                </div>
                                {/* <p className='input-error'>{customErrors?.full_name}</p> */}
                            </div>

                            <div className="com-floating date-filed">
                                <div className='position-relative'>
                                    <i className="f-icon icon-calendar"></i>
                                    <label className="f-label">DOB</label>
                                    <DatePicker
                                        isClearable={false}
                                        selected={watch('dob') as any}
                                        className='f-input'
                                        onChange={(date: any) => setValue('dob', setDateHelper({ date }))}
                                        onKeyDown={(e: any) => e.preventDefault()}
                                        placeholderText='MM/DD/YYYY'
                                        showYearDropdown
                                        maxDate={getCurrentDateHelper()}
                                    />
                                </div>
                                {/* <p className='input-error'>{customErrors?.dob}</p> */}
                            </div>


                            <div className="com-floating">
                                <label className="f-label">Phone</label>
                                <PhoneInput
                                    inputClass="f-input w-100"
                                    placeholder=""
                                    disableInitialCountryGuess={false}
                                    enableLongNumbers={false}
                                    country={"us"}
                                    countryCodeEditable={false}
                                    onChange={handleMobileNumber}
                                    value={`${watch('country_code')} ${watch('mobile_number')}`}
                                />
                            </div>


                            <div className="com-floating">
                                <div className='position-relative'>
                                    <i className="f-icon icon-location"></i>
                                    <label className="f-label">Address</label>
                                    {/* <input
                                        onClick={() => navigate(Routes?.Map)}
                                        className="f-input f-pass-input"
                                        type="text"
                                        placeholder='Enter Address'
                                        value={profileForm?.address}
                                        onChange={(e: any) => handleSetFormValue('address', e?.target?.value, 'address')}
                                    />
                                    <i className="f-pass icon-pickup"></i> */}

                                    <LocationInputField
                                        label="Location*"
                                        placeholder='Enter Address'
                                        value={watch("address")}
                                        onSuccess={handleLocationSuccess}
                                        // onChange={(e: any) => handleSetFormValue('address', e?.target?.value, 'address')}
                                        onChange={(e: any) => setValue('address', e?.target?.value)}
                                    />
                                    <i className="f-pass icon-pickup" onClick={handleFetchCurrentLocation}></i>
                                </div>
                                {/* <p className='input-error'>{customErrors?.address}</p> */}
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="inner-title">Mobility Equipment</h3>
                        {
                            mobilityEquipments?.loading ?
                                <SkeletonLoader count={10} /> :
                                mobilityEquipments?.data?.data?.length > 0 && mobilityEquipments?.data?.data?.map((equipment: any, key: any) => {
                                    return (
                                        <>
                                            <div className="form-check com-check-outline mb-3" key={key}>
                                                <input className="form-check-input" type="checkbox" id={equipment?.id + '_mobility_equipments'} onChange={(e) => handleSelectEquipment(equipment?.id, e?.target?.checked)} checked={watch('mobility_equipment_ids')?.includes(Number(equipment?.id))} />
                                                <label className="form-check-label golden-text" htmlFor={equipment?.id + '_mobility_equipments'}>{equipment?.title}</label>
                                            </div>
                                        </>
                                    )
                                })
                        }
                        <div>
                            <h5 className="transfer-heading">Transfer Level </h5>

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
                            <textarea className="com-input h-auto mt-4 resize-none" rows={4} placeholder="Additional message" onChange={(e) => setValue('transfer_level_message', e?.target?.value)} value={watch('transfer_level_message')}></textarea>
                            <Button className="com-btn w-50" text='Submit' type='submit' isLoading={profileSetup?.loading} />
                        </div>
                    </div>
                </form>
                {/* </div> */}
            </div>
        </main>
    )
}

export default ProfileSetup;























// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { GetMobilityEquipmentAction, GetProfileAction, GetTransferLevelsAction, ProfileSetupAction, UpdateProfileImageAction } from '../../../redux/Action/AuthAction';
// import { appendToKeyInObject, appendToString, getLocationAddress, removeFromString, setDateHelper, showImage } from '../../../utils/Helper';
// import Button from '../../../components/UI/Button';
// import DatePicker from 'react-datepicker';
// import ValidationMessage from '../../../constants/Validation/ValidationMessage';
// import SkeletonLoader from '../../../components/UI/SkeletonLoader';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { useNavigate } from 'react-router-dom';
// import { Routes } from '../../../constants/RouteConstants';
// import LocationInputField from '../../../components/map/LocationInputField';
// import { useForm } from 'react-hook-form';

// interface IProfileFormInputs {
//     email: string;
//     full_name: string;
//     profile_image: string;
//     dob: string;
//     mobile_number: string | number;
//     country_code: string | number;
//     address: string;
//     transfer_level_message: string;
//     mobility_equipment_ids: any;
//     transfer_level_id: any;
// };

// const ProfileSetup = () => {

//     const dispatch = useDispatch<any>();
//     const navigate = useNavigate();
//     const [selectedEquipments, setSelectedEquipments] = useState('');
//     const [selectedTransferLevel, setSelectedTransferLevel] = useState('');
//     const [profileForm, setProfileForm]: any = useState({});
//     const [customErrors, setCustomErrors]: any = useState();
//     const [profileImage, setProfileImage]: any = useState();

//     const mobilityEquipments = useSelector((state: any) => state.GetMobilityEquipmentState);
//     const transferLevels = useSelector((state: any) => state.GetTransferLevelsState);
//     const profileSetup = useSelector((state: any) => state.ProfileSetupState);
//     const updateProfileImage = useSelector((state: any) => state.UpdateProfileImageState);
//     const profile = useSelector((state: any) => state.GetProfileState);

//     const { register, watch, setValue, formState: { errors }, handleSubmit } = useForm<IProfileFormInputs>({
//         mode: 'onChange',
//         // resolver: yupResolver(LoginValidation),
//     });

//     useEffect(() => {
//         dispatch(GetMobilityEquipmentAction({}));
//         dispatch(GetTransferLevelsAction({}));
//     }, [])

//     const handleSelectEquipment = (id: string | number, type: any) => {
//         const isSelected = selectedEquipments.includes(String(id));
//         let updatedSelectedEquipments;
//         if (isSelected) {
//             updatedSelectedEquipments = removeFromString({ string: selectedEquipments, value: id })
//         } else {
//             updatedSelectedEquipments = appendToString({ string: selectedEquipments, value: id })
//         }
//         setSelectedEquipments(updatedSelectedEquipments);
//     }

//     const handleSelectTransferLevel = (id: any) => {
//         setSelectedTransferLevel(String(id))
//     }

//     const handleSelectImage = async (e: any) => {
//         const imageFile = e?.target?.files[0];
//         await dispatch(UpdateProfileImageAction({ profile_image: imageFile }));
//         dispatch(GetProfileAction({}))
//     }

//     const handleFetchCurrentLocation = async () => {
//         const address: any = await getLocationAddress({ type: 'current' });
//         appendToKeyInObject({ obj: setProfileForm, key: 'address', value: address?.address });
//         setCustomErrors({ ...customErrors, address: '' })
//     };

//     const handleLocationSuccess = (result: any) => {
//         appendToKeyInObject({ obj: setProfileForm, key: 'address', value: result?.formattedAddress });
//     }

//     const handleSetupProfile = async () => {
//         let error = { ...customErrors }
//         if (!profileForm?.full_name) {
//             error['full_name'] = `${ValidationMessage?.ANY_REQUIRED}name`
//         }
//         if (!profileForm?.dob) {
//             error['dob'] = `${ValidationMessage?.ANY_REQUIRED}dob`
//         }
//         if (!profileForm?.address) {
//             error['address'] = `${ValidationMessage?.ANY_REQUIRED}address`
//         }
//         setCustomErrors(error)
//         let isErrors = false;
//         Object.keys(error)?.map((key) => {
//             if (isErrors === false && error[key]?.length > 0) {
//                 isErrors = true;
//             }
//         })
//         if (isErrors === false) {
//             profileForm.mobility_equipment_ids = selectedEquipments;
//             profileForm.transfer_level_id = selectedTransferLevel;
//             profileForm.is_profile_complete = 2;

//             await dispatch(ProfileSetupAction(profileForm))

//         }
//     }

//     const handleSetFormValue = (key: any, value: any, name: any = null) => {
//         appendToKeyInObject({ obj: setProfileForm, key: key, value: value })
//         if (name) {
//             if (String(value)?.length > 0) {
//                 setCustomErrors({ ...customErrors, [key]: "" })
//             } else {
//                 setCustomErrors({ ...customErrors, [key]: `${ValidationMessage?.ANY_REQUIRED}${name}` })
//             }
//         }
//     }

//     useEffect(() => {
//         if (profile?.status) {
//             setProfileImage(profile?.data?.data?.profile_image)
//             dispatch(UpdateProfileImageAction('RESET'))

//             appendToKeyInObject({ obj: setProfileForm, key: 'email', value: profile?.data?.data?.email })

//             appendToKeyInObject({ obj: setProfileForm, key: 'country_code', value: profile?.data?.data?.country_code })
//             appendToKeyInObject({ obj: setProfileForm, key: 'mobile_number', value: profile?.data?.data?.mobile_number })

//         }
//         // if (profile?.status) {
//         //     setProfileImage(profile?.data?.data?.profile_image)
//         //     dispatch(UpdateProfileImageAction('RESET'))
//         // } else {
//         //     appendToKeyInObject({ obj: setProfileForm, key: 'email', value: profile?.data?.data?.email })
//         //     if (profile?.data?.data?.profile_image) {
//         //         setProfileImage(profile?.data?.data?.profile_image)
//         //     }
//         // }
//     }, [profile?.status])

//     const handleMobileNumber = (value: any, code: any) => {
//         const regex = new RegExp(code?.dialCode);
//         const phone = value.replace(regex, "");
//         appendToKeyInObject({ obj: setProfileForm, key: 'country_code', value: code?.dialCode })
//         appendToKeyInObject({ obj: setProfileForm, key: 'mobile_number', value: phone })
//     }

//     useEffect(() => {
//         if (profile?.data?.data?.is_profile_complete === 2) {
//             // navigate(Routes?.Home)
//         }
//     }, [profile?.status])

//     useEffect(() => {
//         if (profileSetup?.status) {
//             const fetch = async () => {
//                 await dispatch(GetProfileAction({}))
//                 navigate(Routes?.BookRide)
//             }
//             fetch()
//         }
//     }, [profileSetup?.status])

//     return (
//         <main className="main-content">
//             <div className="profile-setup-card text-white">
//                 <h1 className="ttl">Profile Setup</h1>
//                 {/* <div className="row gx-5 gy-3"> */}
//                 <form className="row gx-5 gy-3">
//                     <div className="col-md-6">
//                         <div className="profile-img-area">
//                             <div className="pro-img">
//                                 <div className="pro-img-inner">
//                                     {
//                                         profileImage ?
//                                             <img src={showImage(profileImage)} alt="user img" />
//                                             :
//                                             <i className="icon-user-2"></i>
//                                     }
//                                 </div>
//                             </div>
//                             <div className="img-btn">
//                                 <input
//                                     className="d-none"
//                                     id="choose-photo"
//                                     type="file"
//                                     onChange={handleSelectImage}
//                                     accept="image/jpeg,image/jpg,image/png"
//                                 />
//                                 <label htmlFor="choose-photo"><i className="icon-edit"></i> Add Photo</label>
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="inner-title">Basic Information</h3>
//                             <div className="com-floating">
//                                 <div className='position-relative'>
//                                     <i className="f-icon icon-user-2"></i>
//                                     <label className="f-label">Name</label>
//                                     <input
//                                         className="f-input"
//                                         type="text"
//                                         placeholder="Enter name"
//                                         onChange={(e: any) => handleSetFormValue('full_name', e?.target?.value, 'name')}
//                                     />
//                                 </div>
//                                 <p className='input-error'>{customErrors?.full_name}</p>
//                             </div>

//                             <div className="com-floating">
//                                 <div className='position-relative'>
//                                     <i className="f-icon icon-envelope"></i>
//                                     <label className="f-label">Email</label>
//                                     <input
//                                         className="f-input"
//                                         type="text"
//                                         placeholder="Enter email"
//                                         readOnly
//                                         value={profileForm?.email}
//                                     />
//                                     <i className="f-pass icon-edit" onClick={() => navigate(Routes?.EmailVerification, { state: { email: profileForm?.email } })}></i>
//                                 </div>
//                                 <p className='input-error'>{customErrors?.full_name}</p>
//                             </div>

//                             <div className="com-floating date-filed">
//                                 <div className='position-relative'>
//                                     <i className="f-icon icon-calendar"></i>
//                                     <label className="f-label">DOB</label>
//                                     <DatePicker
//                                         isClearable={false}
//                                         selected={profileForm?.dob}
//                                         className='f-input'
//                                         onChange={(date: any) => handleSetFormValue('dob', setDateHelper({ date }), 'dob')}
//                                         onKeyDown={(e: any) => e.preventDefault()}
//                                         placeholderText='MM/DD/YYYY'
//                                         showYearDropdown
//                                     />
//                                 </div>
//                                 <p className='input-error'>{customErrors?.dob}</p>
//                             </div>


//                             <div className="com-floating">
//                                 <label className="f-label">Phone</label>
//                                 <PhoneInput
//                                     inputClass="f-input w-100"
//                                     placeholder=""
//                                     disableInitialCountryGuess={false}
//                                     enableLongNumbers={false}
//                                     country={"us"}
//                                     countryCodeEditable={false}
//                                     onChange={handleMobileNumber}
//                                     value={`${profileForm?.country_code} ${profileForm?.mobile_number}`}
//                                 />
//                             </div>


//                             <div className="com-floating">
//                                 <div className='position-relative'>
//                                     <i className="f-icon icon-location"></i>
//                                     <label className="f-label">Address</label>
//                                     {/* <input
//                                         onClick={() => navigate(Routes?.Map)}
//                                         className="f-input f-pass-input"
//                                         type="text"
//                                         placeholder='Enter Address'
//                                         value={profileForm?.address}
//                                         onChange={(e: any) => handleSetFormValue('address', e?.target?.value, 'address')}
//                                     />
//                                     <i className="f-pass icon-pickup"></i> */}

//                                     <LocationInputField
//                                         label="Location*"
//                                         placeholder='Enter Address'
//                                         value={profileForm?.address}
//                                         onSuccess={handleLocationSuccess}
//                                         onChange={(e: any) => handleSetFormValue('address', e?.target?.value, 'address')}
//                                         error={customErrors?.address}
//                                     />
//                                     <i className="f-pass icon-pickup" onClick={handleFetchCurrentLocation}></i>
//                                 </div>
//                                 <p className='input-error'>{customErrors?.address}</p>
//                             </div>

//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <h3 className="inner-title">Mobility Equipment</h3>
//                         {
//                             mobilityEquipments?.loading ?
//                                 <SkeletonLoader count={10} /> :
//                                 mobilityEquipments?.data?.data?.length > 0 && mobilityEquipments?.data?.data?.map((equipment: any, key: any) => {
//                                     return (
//                                         <>
//                                             <div className="form-check com-check-outline mb-3" key={key}>
//                                                 <input className="form-check-input" type="checkbox" id={equipment?.id + '_mobility_equipments'} onChange={(e) => handleSelectEquipment(equipment?.id, e?.target?.checked)} checked={selectedEquipments.includes(String(equipment?.id))} />
//                                                 <label className="form-check-label golden-text" htmlFor={equipment?.id + '_mobility_equipments'}>{equipment?.title}</label>
//                                             </div>
//                                         </>
//                                     )
//                                 })
//                         }
//                         <div>
//                             <h5 className="transfer-heading">Transfer Level </h5>

//                             {
//                                 transferLevels?.loading ?
//                                     <SkeletonLoader count={2} /> :
//                                     transferLevels?.data?.data?.length > 0 && transferLevels?.data?.data?.map((tLevel: any, key: any) => {
//                                         return (
//                                             <>
//                                                 <div className="form-check com-radio mb-3" key={key}>
//                                                     <input className="form-check-input" type="radio" id={tLevel?.id + '_transfer_Levels'} onChange={(e) => handleSelectTransferLevel(tLevel?.id)} checked={selectedTransferLevel.includes(String(tLevel?.id))} />
//                                                     <label className="form-check-label golden-text" htmlFor={tLevel?.id + '_transfer_Levels'}>{tLevel?.title} </label>
//                                                 </div>
//                                             </>
//                                         )
//                                     })
//                             }
//                             <textarea className="com-input h-auto mt-4 resize-none" rows={4} placeholder="Additional message" onChange={(e) => handleSetFormValue('transfer_level_message', e?.target?.value)}></textarea>
//                             <Button className="com-btn w-50" text='Submit' onClick={handleSetupProfile} isLoading={profileSetup?.loading} />
//                         </div>
//                     </div>
//                 </form>
//                 {/* </div> */}
//             </div>
//         </main>
//     )
// }

// export default ProfileSetup;