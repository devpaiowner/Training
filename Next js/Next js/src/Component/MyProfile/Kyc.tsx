import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { AddKycAction, UserGetProfile } from '@/Redux/Actions/AuthAction';
import Spinner from '../Layouts/Spinner';
import { useRouter } from 'next/navigation';
import { RouteConfig } from '@/Config/CommonConfig';
import { toast } from 'react-toastify';


interface FormInputs {
    Name: string
    front: string
    back: string
    DOB: string
    docNumber: string
    doc_type: string
    user_id: string
}


const formSchema: any = Yup.object().shape({
    Name: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "name"),

    doc_type: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "document type"),

    docNumber: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + "document number"),

    DOB: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_SELECT + "dob"),

    front: Yup.mixed()
        .test('fileRequired', VALIDATION_MESSAGE.FILE_REQUIRED, (file: any) => {
            return !!file && !!file.length;
        })
        .test('fileType', VALIDATION_MESSAGE.USER_UNSUPPORTED, (file: any) => {
            if (file?.length > 0 && file[0].type) {
                const supportedTypes = ["image/jpeg", "image/png", "image/jpg"];
                return supportedTypes.includes(file[0].type);
            }
            return true;
        })
        .test('fileSize', VALIDATION_MESSAGE.FILE_TOO_LARGE, (file: any) => {
            if (file?.length > 0 && file[0].size) {
                const maxSizeInBytes = 1024 * 1024
                return file[0].size <= maxSizeInBytes;
            }
            return true;
        }),

    back: Yup.mixed()
        .test('fileRequired', VALIDATION_MESSAGE.FILE_REQUIRED, (file: any) => {
            return !!file && !!file.length;
        })
        .test('fileType', VALIDATION_MESSAGE.USER_UNSUPPORTED, (file: any) => {
            if (file?.length > 0 && file[0].type) {
                const supportedTypes = ["image/jpeg", "image/png", "image/jpg"];
                return supportedTypes.includes(file[0].type);
            }
            return true;
        })
        .test('fileSize', VALIDATION_MESSAGE.FILE_TOO_LARGE, (file: any) => {
            if (file?.length > 0 && file[0].size) {
                const maxSizeInBytes = 1024 * 1024
                return file[0].size <= maxSizeInBytes;
            }
            return true;
        }),
});


const Kyc = (props: any) => {
    const dispatch = useDispatch<any>();
    const router: any = useRouter();
    const user = props?.userData?.data?.data;
    const addKyc = useSelector((state: any) => state.AddKycState);

    const { register, setValue, formState: { errors }, watch, handleSubmit } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });


    useEffect(() => {
        if (addKyc?.data?.status) {
            const fetch = async () => {
                await dispatch(UserGetProfile({}));
                router.push(`${RouteConfig?.Profile}?=profile`)
            }
            fetch()
        }
    }, [addKyc])

    const onSubmit = (payload: FormInputs) => {
        if (watch('front')[0] && watch('back')[0]) {
            payload['front'] = watch('front')[0]
            payload['back'] = watch('back')[0]
        } else {
            return toast.error("Please select document files")
        }
        payload['user_id'] = user?._id
        dispatch(AddKycAction(payload))
    }

    useEffect(() => {
        // if (user?.kyc) {
        if (user?.kyc && user?.kyc?.verified !== 'rejected') {
            router.push(`${RouteConfig?.Profile}?=profile`)
        }

        setValue('doc_type', 'aadhar')
    }, [user])

    return (
        <>
            {addKyc?.loading && <Spinner />}
            <div className="col-md-8 col-lg-9">
                <div className="accountRight h-100">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Add Kyc</h1>
                        <button onClick={() => router.push(`${RouteConfig?.Profile}?=profile`)} className="btn btn-outline-light"><span></span>Cancel</button>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-xxl-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formBox">
                                    <div className="row gy-4 my-4">
                                        <div className="col-md-6">
                                            <label>Full Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Full Name As Per Document" {...register('Name')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="Name"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Date Of Birth</label>
                                            <input type="date" className="form-control" placeholder="Enter City" {...register('DOB')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="DOB"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Document Type</label>
                                            <select className="form-select"  {...register('doc_type')} >
                                                {/* <option style={{ color: "black" }} value=''>Select</option> */}
                                                < option style={{ color: "black" }} value='aadhar'>Aadhar</option>
                                                < option style={{ color: "black" }} value='pancard'>Pan Card</option>
                                                < option style={{ color: "black" }} value='passport'>Passport</option>
                                            </select>
                                            <ErrorMessage
                                                errors={errors}
                                                name="doc_type"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>{watch('doc_type') === 'aadhar' ? 'Aadhar Card Number' : watch('doc_type') === 'passport' ? 'Passport Number' : 'Pan Card Number'}</label>
                                            <input type="text" className="form-control" placeholder={watch('doc_type') === 'aadhar' ? 'Enter Aadhar Card Number' : watch('doc_type') === 'passport' ? 'Enter Passport Number' : 'Enter Pan Card Number'} {...register('docNumber')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="docNumber"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>{watch('doc_type') === 'aadhar' ? "Aadhar" : watch('doc_type') === 'passport' ? "Passport" : "Pan"} Card Front Picture</label>
                                            <input type="file" className="form-control" accept="image/*" placeholder="" {...register('front')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="front"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>{watch('doc_type') === 'aadhar' ? "Aadhar" : watch('doc_type') === 'passport' ? "Passport" : "Pan"} Card Back Picture</label>
                                            <input type="file" className="form-control" accept="image/*" placeholder="" {...register('back')} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="back"
                                                render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit" >Verify Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Kyc