import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { getFromLocalStorage, getFromSessionStorage, removeFromLocalStorage, removeFromSessionStorage } from '@/utils/Helper';
import $ from "jquery";
import { UserSendMailAction } from '@/Redux/Actions/AuthAction';
import { toast } from 'react-toastify';
import { GenerateRandomUpiAction } from '@/Redux/Actions/PaymentAction';

const UserLoginPasswordModal = () => {

    const dispatch = useDispatch<any>();
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [accountDetails, setAccountDetails]: any = useState({
        username: "",
        password: "",
        email: ""
    })

    const handleDownload = () => {
        const fileContent = `User ID: ${accountDetails?.username}\nPassword: ${accountDetails?.password}`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const fileDownloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileDownloadUrl;
        downloadLink.download = "credentials.txt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(fileDownloadUrl);
    };

    const takeScreenshot = () => {
        toast.success('Your download will begin soon.')
        html2canvas($('.userAccountDetails')[0]).then(canvas => {
            const imgURL = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = imgURL;
            link.download = 'screenshot.png';
            link.click();
        });
    };


    const loginAgain = () => {
        // window.location.href = "/"
    }

    const handleSendToEmail = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailRegex.test(accountDetails?.email)) {
            setError('')
            const sendMail = await dispatch(UserSendMailAction(accountDetails))
            if (sendMail) {
                // $('.btn-close').click()
            }
        } else {
            setError('Please enter a valid email address.')
        }
    }
    useEffect(() => {
        if (getFromSessionStorage('userOneClickRegistration')) {
            const userDegtails: any = getFromSessionStorage('userOneClickRegistration');
            const decodeDetails = JSON.parse(userDegtails)
            setAccountDetails({
                username: decodeDetails?.username,
                password: decodeDetails?.password
            })
        }
    }, [])

    const handleCopy = () => {
        if (isCopied) {
            return;
        }
        setIsCopied(true)
        const payload = {
            'username': accountDetails?.username,
            'password': accountDetails?.password
        }
        if(typeof navigator !=='undefined'){
            navigator.clipboard.writeText(JSON.stringify(payload))
        }
        toast.success("Copied.")
        setTimeout(() => {
            setIsCopied(false)
        }, 3000);

    }

    useLayoutEffect(() => {
        setTimeout(() => {
            if (getFromSessionStorage('userOneClickRegistration')) {
                $("#userRegisterComplete").click();
                setTimeout(() => {
                    removeFromSessionStorage('userOneClickRegistration')
                }, 1000);
            }
        }, 2500);
    }, [])

    return (
        <>
            <div className="modal moder_s1 fade userAccountDetails" id="RegisterConfirm" tabIndex={-1} aria-labelledby="LoginModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" onClick={() => { loginAgain() }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div className="modleRight">
                                <h1>Thanks for the registration!</h1>
                                <div className="text-center text-light my-5">
                                    <div className="input-group userPasGroup mb-3">
                                        <span className="input-group-text">Username: <b>{accountDetails?.username}</b></span>
                                        <span className="input-group-text">Password: <b>{accountDetails?.password}</b></span>
                                        <button className="btn btn-primary" type="button" id="button-addon1" onClick={() => { handleCopy() }}>{isCopied ? 'Copied' : 'Copy'}</button>
                                    </div>
                                    <p>Do not forget to save your username and password!</p>
                                </div>
                                {/* <form> */}
                                <div className="formBox">
                                    <div className="row gy-4 my-5">
                                        <div className="col-md-6">
                                            <button onClick={() => { handleDownload() }} className="savefile w-100" type="button">Save to file</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button onClick={() => { takeScreenshot() }} className="savefile w-100" type="button">Save as picture</button>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" placeholder="Enter Email Address" onChange={(e) => setAccountDetails({ ...accountDetails, email: e?.target?.value })} />
                                            <p className='text-danger'>{error && error}</p>
                                        </div>
                                        <div className="col-md-6"><button className="btn btn-primary w-100" type="button" onClick={handleSendToEmail}>Send to e-mail</button></div>
                                    </div>
                                </div>

                                {/* </form> */}
                                <div className="bottomTex">
                                    <h6>You're just one step away from a bounus</h6>
                                    <p>Get up to 20000 INR on your first deposit</p>
                                    <button className="btn btn-primary" type="button" onClick={() => dispatch(GenerateRandomUpiAction({}))} data-bs-target="#makeDeposit" data-bs-toggle="modal">Make A Deposit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLoginPasswordModal