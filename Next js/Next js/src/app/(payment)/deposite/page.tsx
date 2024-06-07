'use client'
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { DepositeAction, GenerateRandomUpiAction, GetPaymentUpiAction } from '@/Redux/Actions/PaymentAction';
import { generatePaymentData, getFromLocalStorage, isNotEmpty } from '@/utils/Helper';
import { toast } from 'react-toastify';
import { RouteConfig } from '@/Config/CommonConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/Component/Layouts/Spinner';
// import QRCode from 'qrcode'

const QRCode = require('qrcode');

const Deposit = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const initialTime = 10 * 60;
  const [error, setError] = useState('');
  const [orderToken, setOrderToken] = useState('');
  const [agentUpiId, setAgentUpiId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [agentName, setAgentName] = useState('');
  const [paymentQrCode, setPaymentQrCode] = useState('');
  const [timer, setTimer]: any = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const userDepositeDetails = useSelector((state: any) => state.UserDepositeDetailsState)
  const GenerateRandomUpi = useSelector((state: any) => state.GenerateRandomUpiState)
  const userDeposite = useSelector((state: any) => state.DepositeState)
  const paymentUpi = useSelector((state: any) => state.GetPaymentUpiState)

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer({ minutes: Math.floor(initialTime / 60), seconds: initialTime % 60 });

    const countdown = setInterval(() => {
      setTimer((prevTimer: any) => {
        if (prevTimer.seconds === 0) {
          if (prevTimer.minutes === 0) {
            clearInterval(countdown);
            setIsTimerRunning(false);
            router.push(RouteConfig?.Home)
            toast.error("Payment session expired, try again.")
            return prevTimer;
          } else {
            return { minutes: prevTimer.minutes - 1, seconds: 59 };
          }
        } else {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        }
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      setIsTimerRunning(false);
    }, initialTime * 1000);
  };


  // useEffect(() => {
  //   if (isNotEmpty(userDepositeDetails?.data?.upiType && userDepositeDetails?.data?.amount)) {
  //     startTimer();
  //     dispatch(GenerateRandomUpiAction({}))
  //   } else {
  //     router.push(RouteConfig?.Home)
  //   }
  // }, [userDepositeDetails]);


  useEffect(() => {
    if (userDepositeDetails?.data) {
      dispatch(GetPaymentUpiAction({
        payment_app: userDepositeDetails?.data?.upiType
      }))
    }
  }, [userDepositeDetails])

  useEffect(() => {
    if (paymentUpi?.data?.status && userDepositeDetails?.data?.amount) {
      let upiStringChange;
      upiStringChange = generatePaymentData(agentUpiId, agentName, userDepositeDetails?.data?.amount)
      setAgentUpiId(paymentUpi?.data?.data.upi_id)
      setAgentName(paymentUpi?.data?.data.upi_user)
      setUpiId(paymentUpi?.data?.data._id)
      const options = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1
      };

      QRCode?.toDataURL(upiStringChange, options, function (err: any, url: any) {
        if (err) {
          console.error('Error generating QR Code:', err);
          return;
        }
        setPaymentQrCode(url)
      });
      startTimer()
    } else if (paymentUpi?.data?.status === false) {
      router.push(RouteConfig?.Home)
    }
  }, [paymentUpi?.data])


  // useEffect(() => {
  //   // if (GenerateRandomUpi?.data?.status === true) {
  // if (userDepositeDetails?.data?.upiType && userDepositeDetails?.data?.amount && GenerateRandomUpi?.data?.status) {
  //   const generateUPIList = GenerateRandomUpi.data?.data
  //   const paycase = userDepositeDetails?.data?.upiType.toLowerCase().replace(/\s+/g, '')

  //   let upiStringChange;
  //   if (generateUPIList?.length > 0) {
  //     generateUPIList.map((upi: any) => {
  //       if (upi != null) {
  //         if (upi.payment_app.toLowerCase().replace(/\s+/g, '') === paycase) {
  //           upiStringChange = generatePaymentData(agentUpiId, agentName, userDepositeDetails?.data?.amount)
  //           setAgentUpiId(upi.upi_id)
  //           setAgentName(upi.upi_user)
  //           setUpiId(upi._id)
  //         }
  //       }
  //     })
  //   }
  //   const options = {
  //     errorCorrectionLevel: 'H',
  //     type: 'image/jpeg',
  //     quality: 0.3,
  //     margin: 1
  //   };

  //   QRCode?.toDataURL(upiStringChange, options, function (err: any, url: any) {
  //     if (err) {
  //       console.error('Error generating QR Code:', err);
  //       return;
  //     }
  //     setPaymentQrCode(url)
  //   });
  //   startTimer()
  // } else {
  //   router.push(RouteConfig?.Home)
  // }
  // }, [GenerateRandomUpi?.data])



  // useEffect(() => {
  //   // if (GenerateRandomUpi?.data?.status === true) {
  //   if (userDepositeDetails?.data?.upiType && userDepositeDetails?.data?.amount && GenerateRandomUpi?.data?.status) {
  //     const generateUPIList = GenerateRandomUpi.data?.data
  //     const paycase = userDepositeDetails?.data?.upiType.toLowerCase().replace(/\s+/g, '')

  //     let upiStringChange;
  //     if (generateUPIList?.length > 0) {
  //       generateUPIList.map((upi: any) => {
  //         if (upi != null) {
  //           if (upi.payment_app.toLowerCase().replace(/\s+/g, '') === paycase) {
  //             upiStringChange = generatePaymentData(agentUpiId, agentName, userDepositeDetails?.data?.amount)
  //             setAgentUpiId(upi.upi_id)
  //             setAgentName(upi.upi_user)
  //             setUpiId(upi._id)
  //           }
  //         }
  //       })
  //     }
  //     const options = {
  //       errorCorrectionLevel: 'H',
  //       type: 'image/jpeg',
  //       quality: 0.3,
  //       margin: 1
  //     };

  //     QRCode?.toDataURL(upiStringChange, options, function (err: any, url: any) {
  //       if (err) {
  //         console.error('Error generating QR Code:', err);
  //         return;
  //       }
  //       setPaymentQrCode(url)
  //     });
  //     startTimer()
  //   } else {
  //     router.push(RouteConfig?.Home)
  //   }
  // }, [GenerateRandomUpi?.data])


  useEffect(() => {
    if (userDeposite?.data?.status === true) {
      toast.success("Deposite request successfully.")
      $('.btn-close').click();
      setOrderToken('')
      setAgentUpiId('')
      setUpiId('')
      setAgentName('')
      setPaymentQrCode('')
      setError('')
      setTimeout(() => {
        router.push(RouteConfig?.Home)
      }, 2000);
      userDeposite.data.status = false
    }
  }, [userDeposite?.data])

  const onSubmit = () => {
    if (orderToken.trim().length < 10) {
      setError("UTR number must be at least 10 digits long.");
    } else {
      const userDetails: any = getFromLocalStorage('UserDetails');
      setError('')
      if (isNotEmpty(userDetails)) {
        let user = JSON.parse(userDetails)
        const payload = {
          upiId: upiId,
          amount: userDepositeDetails?.data?.amount,
          userid: user?._id,
          order_token: orderToken,
          bonus_id: userDepositeDetails?.data?.bonus_Id
        }
        dispatch(DepositeAction(payload))
      }
    }
  }


  useEffect(() => {
    return () => {
      dispatch({ type: "GENERATE_RANDOM_UPI_FAIL", payload: null })
    }
  }, [])

  return (
    <>
      {userDeposite?.loading && <Spinner />}
      <div className="moder_s1" id="paymentRequet" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
        <div className="modal-dialog  modal-xl modal-dialog-centered">
          <div className="modal-content bg-light">
            <div className="modal-body">
              <div className="modelHeadr">
                <p>Request expires in:
                  {
                    (timer?.seconds !== undefined && timer?.minutes !== undefined)
                      ? ` ${String(timer?.minutes).padStart(2, '0')} : ${String(timer?.seconds).padStart(2, '0')}`
                      : "09:59"
                  }
                </p>
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>It could take us a few minutes to confirm your deposit...</p>
              </div>
              <div className="p-5">
                <div className="row gx-5">
                  <div className="col-md-6">
                    <div className="upiMt text-dark">
                      <p className="f-20"> <img src="images/upi.png" />Payment</p>
                      <p>Transfer to {agentName}</p>
                    </div>
                    <div className="text-center QRCode">
                      {paymentQrCode && <img src={paymentQrCode} alt="QR Code" />}
                    </div>
                    <div className="text-center upiBOttom">
                      <p>{agentUpiId}</p>
                      <p>Scan QR for payment or click to copy UPID</p>
                    </div>
                  </div>
                  <div className="col-md-6 UPIPaymentRight">
                    <div className="card">
                      <div className="card-body">
                        <h6>Summary</h6>
                        <ul>
                          <li><span>Order</span>Payment-9f4bb282-1738-44d2-a4da</li>
                          <li><span>ID:</span>2ac61eac8994</li>
                        </ul>
                        <div className="total mt-4"><span>Purchase Amount</span>
                          <span><i className="fa-solid fa-indian-rupee-sign"></i> {userDepositeDetails?.data?.amount}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="PayableAmount fw-700 my-4">
                      <span>Payable Amount</span> <span><i className="fa-solid fa-indian-rupee-sign"></i> {userDepositeDetails?.data?.amount}</span>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h6>Alread Paid?</h6>
                        <div className="mb-3">
                          <input type="text" maxLength={20} className="form-control" placeholder="Enter UTR Number" value={orderToken} onChange={(e) => setOrderToken(e?.target?.value)} />
                          <div className="text-danger">{error}</div>
                        </div>
                        <button type="button" className="btn btn-primary w-100 mb-3" onClick={onSubmit}>Submit</button>
                        <Link href={RouteConfig?.Home} type="button" className="btn btn-danger w-100">Cancel</Link>
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

export default Deposit