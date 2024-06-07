import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { WithdrawAction, WithdrawalDetailsAction } from '@/Redux/Actions/PaymentAction';
import { toast } from "react-toastify";
import { isEmpty } from '@/utils/Helper';

const WithdrawalMethods = () => {

    const dispatch = useDispatch<any>();
    const [error, setError] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('0');
    const user = useSelector((state: any) => state.UserGetProfileState);
    const userWalletBalance = useSelector((state: any) => state.UserWalletBalanceUpdateSocketState);


    const handleSetAmount = (e: any) => {
        let inputAmount = e.target.value;
        inputAmount = inputAmount.replace(/\D/g, '');
        inputAmount = Math.min(parseInt(inputAmount, 10) || 0, 40000).toString();
        setWithdrawalAmount(inputAmount);
    };

    const handleOnSelect = (e: any) => {
        e.preventDefault();
        if (user?.data?.data?.kyc && user?.data?.data?.kyc?.verified === 'complete') {
            if (isEmpty(withdrawalAmount) || withdrawalAmount === '0') {
                setError('Please enter a valid ammount.');
            } else if (parseInt(withdrawalAmount, 10) < 2000) {
                setError('Minimum withdrawal amount is ₹2000.');
            } else if (parseInt(withdrawalAmount, 10) > 40000) {
                setError('Maximum withdrawal amount is ₹40000.');
            } else {
                setError('');
                setWithdrawalAmount('')
                $('.paymentPage').click()
                dispatch(WithdrawalDetailsAction(withdrawalAmount))
            }
        } else {
            toast.error("Please complete kyc to proceed.")
        }
    }

    return (
        <>
            <div className="modal moder_s1 fade" id="Paymentwithdrawal" tabIndex={-1} aria-labelledby="LoginModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div className="row gx-0">
                                <div className="col-md-12">
                                    <div className="modleRight">
                                        <div className="row justify-content-center text-light mt-4">
                                            <div className="col-md-5 text-center">
                                                <p>Withdrawal Amount</p>
                                                <p className="fw-700 f-24"><i className="fa-solid fa-indian-rupee-sign"></i>{userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.withdrawAmount).toFixed(2) : parseFloat(user?.data?.data?.withdrawAmount).toFixed(2)}</p>
                                            </div>
                                            <div className="col-md-5 text-center">
                                                <p>Real Amount</p>
                                                <p className="fw-700 f-24"><i className="fa-solid fa-indian-rupee-sign"></i>{userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.Wallet_balance).toFixed(2) : parseFloat(user?.data?.data?.Wallet_balance).toFixed(2)} INR</p>
                                            </div>
                                            <div className="col-10">
                                                <form className="formBox" onSubmit={handleOnSelect}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Enter Withdrawal Amount</label>
                                                        <input type="text" className="form-control" placeholder="&#8377; 0" value={withdrawalAmount} onChange={(e) => handleSetAmount(e)} />
                                                        <div className="text-danger">{error}</div>
                                                        <div className="form-text">Min 2000 INR - Max 40000 INR</div>
                                                    </div>
                                                    <button type="button" className="btn btn-success d-none w-100 paymentPage" data-bs-target="#withdrawalDetails" data-bs-toggle="modal">WithdrawalDetailsTemp</button>
                                                    <button type="submit" className="btn btn-success w-100">Continue</button>
                                                </form>
                                                <p className="text-center mt-4">Processing time: <strong>10 Minutes - 24 Hours</strong></p>
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

export default WithdrawalMethods