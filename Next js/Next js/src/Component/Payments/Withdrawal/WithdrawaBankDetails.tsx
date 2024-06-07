import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { ErrorMessage } from '@hookform/error-message';
import $ from 'jquery';
import { WithdrawAction, WithdrawalDetailsAction } from '@/Redux/Actions/PaymentAction';
import { toast } from 'react-toastify';


interface FormInputs {
    account_holder: string
    account_no: string
    ifsc_code: string
    bank_name: string
    upiId: string
    amount: string
}

const formSchema: any = Yup.object().shape({
    account_holder: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + 'Account Holder Name'),

    account_no: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + 'Account Number')
        .matches(/^\d{9,18}$/, 'Invalid Account Number'),

    ifsc_code: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + 'IFSC Code')
        .matches(/^[A-Za-z]{4}/, 'First 4 characters must be letters')
        .matches(/^.{4}0/, '5th character of IFSC Code must be 0')
        .matches(/[0-9]{6}$/, 'Last 6 characters must be numbers'),

    bank_name: Yup.string()
        .required(VALIDATION_MESSAGE?.ANY_REQUIRED + 'Bank Name'),

    upiId: Yup.string()
});

const WithdrawaBankDetails = () => {

    const dispatch = useDispatch<any>();
    let withdrawDetails = useSelector((state: any) => state.WithdrawDetailsState);
    const userWithdraw = useSelector((state: any) => state.WithdrawState);


    const { register, formState: { errors }, handleSubmit, reset } = useForm<FormInputs>({
        resolver: yupResolver(formSchema),
    });


    const onSubmit = (payload: FormInputs) => {
        payload.amount = withdrawDetails.data
        dispatch(WithdrawAction(payload))
    }

    useEffect(() => {
        if (userWithdraw?.data?.status === true) {
            toast.success('Withdraw request successfully.');
            $('.btn-close').click()
            reset()
        }
    }, [userWithdraw?.data])

    return (
        <>
            <div className="modal moder_s1 fade" id="withdrawalDetails" tabIndex={-1} aria-labelledby="LoginModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div className="row gx-0">
                                <div className="col-md-12">
                                    <div className="modleRight">
                                        <div className="row justify-content-center text-light mt-4">
                                            <div className="col-10">
                                                <form className="formBox" onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Account Holder Name</label>
                                                        <input type="text" className="form-control" {...register('account_holder')} />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="account_holder"
                                                            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Account Number</label>
                                                        <input type="text" className="form-control" {...register('account_no')} />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="account_no"
                                                            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">IFSC Code</label>
                                                        <input type="text" className="form-control" {...register('ifsc_code')} maxLength={11} />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="ifsc_code"
                                                            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Bank Name</label>
                                                        <input type="text" className="form-control" {...register('bank_name')} />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="bank_name"
                                                            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">UPI (Optional)</label>
                                                        <input type="text" className="form-control" {...register('upiId')} />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="upiId"
                                                            render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
                                                        />
                                                    </div>
                                                    {/* <button type="submit" className="btn btn-success w-100" data-bs-target="#Paymentwithdrawal" data-bs-toggle="modal">Next</button> */}
                                                    <button type="submit" className="btn btn-success w-100">Next</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithdrawaBankDetails