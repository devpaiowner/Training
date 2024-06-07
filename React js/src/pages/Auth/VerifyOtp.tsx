import React, { useEffect, useRef, useState } from 'react'
import { hideEmail, reverseTimerHelper } from '../../utils/Helper';
import { Images } from '../../constants/ImageConstants'
import { CheckUserAction, MobileVerificationAction, OtpVerifyAction, ProfileSetupAction, ResendOtpAction, SignUpAction } from '../../redux/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { UserRoles, VerifyOtpTypes } from '../../constants/Constants';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../constants/RouteConstants';

const VerifyOtp = ({ payload }: any) => {
  let countdown: any;
  const initialState: any = {
    email: "",
    otp: "",
    role_id: "",
  };

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const numberOfDigits = 4;
  const regex = /^[0-9\b]+$/;
  const otpBoxRef = useRef<any>([]);

  const initialTime = 120;
  const [timer, setTimer] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [OtpData, setOtpData] = useState<any>(initialState);
  const [isResendOtp, setIsResendOtp] = useState(false);
  const [otpError, setOtpError] = useState('');

  const checkUser = useSelector((state: any) => state.CheckUserState);
  const verifyOtp = useSelector((state: any) => state.VerifyOtSignUpStatepState);
  const SignUpState = useSelector((state: any) => state.SignUpState);
  const verifyOtpState = useSelector((state: any) => state.VerifyOtpState);
  const profileSetupState = useSelector((state: any) => state.ProfileSetupState);

  const handleChange = (value: any, index: any) => {
    if (value === '' || regex.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
    }

    if (value && regex.test(value) && index < numberOfDigits - 1) {
      otpBoxRef.current[index + 1].focus();
    }
  }

  const onPaste = (event: any) => {
    const pasted = event.clipboardData.getData("text/plain")
    if (pasted.length === numberOfDigits && regex.test(pasted)) {
      setOtp(pasted.split("").slice(0, numberOfDigits))
    }
  }

  function handleBackspaceAndEnter(e: any, index: any) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxRef.current[index - 1].focus()
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxRef.current[index + 1].focus()
    }
  }

  // const startTimer = () => {
  //   const intervalId = reverseTimerHelper(initialTime, (updatedTime: any) => {
  //     setTimer(updatedTime);
  //   });
  //   return () => clearInterval(intervalId);
  // }

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      setIsTimerRunning(false);
    }
    return () => {
      clearInterval(countdown);
    };
  }, [isTimerRunning, timer]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(initialTime);
  };

  useEffect(() => {
    if (payload && isResendOtp === false) {
      startTimer()
    }
  }, [payload])

  useEffect(() => {
    let data = {};
    data = {
      ...payload,
      role_id: 2,
      device_type: "Web",
      otp: otp?.join(""),
    };
    setOtpData(data);
  }, [payload, otp])

  const handleVerify = () => {
    if (otp.join("") == "" || OtpData?.otp?.length < 4) {
      return setOtpError('Please enter OTP.')
    }
    
    setOtpError('');

    if (payload?.request_type == VerifyOtpTypes?.SignUp) {
      dispatch(SignUpAction(OtpData));
    }
    if (payload?.request_type == VerifyOtpTypes?.ForgotPassword) {
      dispatch(OtpVerifyAction(OtpData));
    }
    if (payload?.request_type == VerifyOtpTypes?.ContactVerify) {
      const data = {
        ...OtpData,
        is_profile_complete: 1
      }
      dispatch(ProfileSetupAction(data));
    }
  }

  const handleResendOtp = () => {
    if (payload?.request_type == VerifyOtpTypes?.ContactVerify) {
      dispatch(MobileVerificationAction(payload));
    } else {
      dispatch(ResendOtpAction(payload));
    }
    setIsResendOtp(true);
    startTimer();
  }

  useEffect(() => {
    if (isResendOtp && checkUser?.status === true) {
      if (payload?.request_type == VerifyOtpTypes?.SignUp) {
        startTimer()
      }
    }
  }, [checkUser])

  useEffect(() => {
    if (verifyOtpState?.status === true) {
      $("#verify-btn-close").click();
      navigate(Routes?.ResetPassword, { state: { email: verifyOtpState?.data?.data?.email } });
      dispatch(OtpVerifyAction("RESET"));
    }
  }, [verifyOtpState])

  useEffect(() => {
    if (SignUpState?.status) {
      $("#verify-btn-close").click();
      dispatch(SignUpAction("RESET"));
      navigate(Routes?.PhoneVerify);
    }
  }, [SignUpState?.status])

  useEffect(() => {
    if(profileSetupState?.status){
      dispatch(ProfileSetupAction('RESET'));
      $("#verify-btn-close").click();
      navigate(Routes?.ProfileSetup);
    }
  },[profileSetupState])

  return (
    <div className="modal fade com-modal auth-modal" id="otpModal" tabIndex={-1} data-bs-backdrop="static" aria-labelledby="otpModalLabel" aria-hidden="true">
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" id="verify-btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            <img className="auth-logo" src="./images/logo-large.svg" alt="" />
            <div className="head">
              <h2>OTP Verification</h2>
              <p className="mb-0">A 4-digit verification code <br />was just sent to {payload?.email ? hideEmail(payload?.email) : "your phone."}</p>
              {/* <p className="mb-0">A 4-digit verification code <br />was just sent to ●●●●●●@gmail.com</p> */}
            </div>
            <div className="otp-input mt-5 mb-4">
              {
                otp.map((digit, index) => {
                  return (
                    <input
                      key={index}
                      value={digit}
                      onPaste={onPaste}
                      maxLength={1}
                      ref={(ref) => (otpBoxRef.current[index] = ref)}
                      type="text"
                      className="com-input"
                      placeholder="*"
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                    />
                  )
                })
              }
            </div>
            <p className='text-danger'>{otpError}</p>
            {isTimerRunning && <div className="otp-time mb-3">Resend in : {timer} sec</div>}
            <Button onClick={handleVerify} text='Verify' className='com-btn w-100 form-submit-btn' isLoading={checkUser?.loading || verifyOtp?.loading || verifyOtpState?.loading || profileSetupState?.loading} />
            {timer === 0 && <button type="button" className="resend-btn" onClick={handleResendOtp}>Resend</button>}
          </div>
        </div>
      </div>
    </div>

  )
}

export default VerifyOtp