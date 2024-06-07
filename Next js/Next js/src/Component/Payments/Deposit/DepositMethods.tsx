import Spinner from '@/Component/Layouts/Spinner';
import { RouteConfig } from '@/Config/CommonConfig';
import { GetPromotionsAction } from '@/Redux/Actions/HomeAction';
import { GenerateRandomUpiAction, UserDepositeDetailsAction } from '@/Redux/Actions/PaymentAction';
import { getFromSessionStorage, isEmpty, isJson, isNotEmpty, removeFromSessionStorage } from '@/utils/Helper';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DepositMethods = () => {

    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [error, setError] = useState('');
    const [depositeAmount, setDepositeAmount] = useState('0');
    const [depositUpiType, setDepositUpiType] = useState('');
    const [bonusDetails, setBonusDetails] = useState('Get More Apply Bonus (Optional)');
    const [bonusId, setBonusId] = useState('');

    const [upiImage, setUpiImage] = useState('');
    const [isUpiActive, setIsUpiActive]: any = useState({
        paytm: false,
        phonePe: false,
        googlePay: false,
        upi: false
    });
    const GenerateRandomUpi = useSelector((state: any) => state.GenerateRandomUpiState)
    const PromotionsList = useSelector((state: any) => state.GetPromotionsState);
    const user = useSelector((state: any) => state.UserGetProfileState);
    // console.log("PromotionsList",PromotionsList);


    useEffect(() => {
        if (user?.data?.data) {
            let payload = {
                "user_id": user?.data?.data?._id
            }
            dispatch(GetPromotionsAction(payload))
        }
    }, [user])


    useEffect(() => {
        let bonus_details: any = getFromSessionStorage('bonus_details');
        if (bonus_details && isJson(bonus_details)) {
            bonus_details = JSON.parse(bonus_details)
            setBonusDetails(bonus_details?.name)
            setBonusId(bonus_details?.id)
            removeFromSessionStorage('bonus_details')
        }
    }, [GenerateRandomUpi])

    const handleSetAmount = (e: any) => {
        let inputAmount = e.target.value;
        inputAmount = inputAmount.replace(/\D/g, '');
        inputAmount = Math.min(parseInt(inputAmount, 10) || 0, 40000).toString();
        setDepositeAmount(inputAmount);
    };

    const selectBonus = (bonus_details: any) => {
        setBonusDetails(bonus_details?.Name?.en)
        setBonusId(bonus_details?.ID)
    }

    const handleOnSelect = (e: any) => {
        e.preventDefault();
        if (!isNotEmpty(depositeAmount) || depositeAmount == '0') {
            setError('Please enter a valid ammount.');
        } else if (parseInt(depositeAmount, 10) < 100) {
            setError('Minimum deposite amount is ₹100.');
            // setError('Amout should not less than ₹100.');
        } else if (parseInt(depositeAmount, 10) > 40000) {
            setError('Maximum deposite amount is ₹40000.');
        } else if (!isNotEmpty(depositUpiType)) {
            setError('');
            toast.error("Please select upi type")
        } else {
            router.push(RouteConfig?.Deposite)
            const params = {
                amount: depositeAmount,
                upiType: depositUpiType,
                bonus_Id: bonusId
            }
            dispatch(UserDepositeDetailsAction(params))
            setTimeout(() => {
            }, 2000);
            setError('');
            setDepositeAmount('')
            setDepositUpiType('')
            $('.btn-close').click()
            setBonusDetails('Get More Apply Bonus (Optional)')
        }
    }

    const paymentMethods = [
        {
            image: "images/Paytm_logo_PNG1.png",
            slug: "paytm",
            name: "Paytm",
            isActive: isUpiActive?.paytm
        }, {
            image: "images/phone_pe_logo.png",
            slug: "phonePe",
            name: "PhonePe",
            isActive: isUpiActive?.phonePe
        }, {
            image: "images/google_pay_logo.png",
            slug: "googlePay",
            name: "Google Pay",
            isActive: isUpiActive?.googlePay
        }, {
            image: "images/upi_logo.png",
            slug: "upi",
            name: "UPI",
            isActive: isUpiActive?.upi
        }
    ]

    useEffect(() => { // Clear Payment data when left 
        return () => {
            setError('')
            setDepositeAmount('')
            setDepositUpiType('')
            setUpiImage('')
            setBonusId('')
            setBonusDetails('Get More Apply Bonus (Optional)')
        }
    }, []);

    useEffect(() => {
        if (GenerateRandomUpi) {
            setIsUpiActive({
                paytm: GenerateRandomUpi?.data?.data[0].includes('paytm') && true,
                phonePe: GenerateRandomUpi?.data?.data[0].includes('phonePe') && true,
                googlePay: GenerateRandomUpi?.data?.data[0].includes('googlePay') && true,
                upi: GenerateRandomUpi?.data?.data[0].includes('upi') && true
            })

            // setIsUpiActive({
            //     paytm: GenerateRandomUpi?.data?.data?.find((d: any) => d?.payment_app == 'paytm') && true,
            //     phonePe: GenerateRandomUpi?.data?.data?.find((d: any) => d?.payment_app == 'phonePe') && true,
            //     googlePay: GenerateRandomUpi?.data?.data?.find((d: any) => d?.payment_app == 'googlePay') && true,
            //     upi: GenerateRandomUpi?.data?.data?.find((d: any) => d?.payment_app == 'upi') && true
            // })
        }
    }, [GenerateRandomUpi])

    const handleClose = () => {
        setError('')
        setDepositeAmount('')
        setDepositUpiType('')
        setUpiImage('')
        setBonusId('')
        setBonusDetails('Get More Apply Bonus (Optional)')
    }
    return (
        <>
            {GenerateRandomUpi?.loading && <Spinner />}
            <div className="modal moder_s1 fade" id="makeDeposit" tabIndex={-1} aria-labelledby="LoginModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose()}><img src="images/close-btn.svg" /></button>
                            <div className="row gx-0">
                                <div className="col-md-5 paymentLeft">
                                    <div className="p-3 p-md-4">
                                        <h6 className="my-md-4 pe-4">Choose Deposit Method</h6>
                                        <p>You can use them now</p>
                                        <ul className="paymentList itemCollum">
                                            {
                                                paymentMethods?.length > 0 &&
                                                paymentMethods?.map((depositeTypes: any, depositeTypesKey: any) => {
                                                    return (
                                                        <Fragment key={depositeTypesKey}>
                                                            {
                                                                depositeTypes?.isActive &&
                                                                <li>
                                                                    <div className={`paymentItem ${depositeTypes?.slug === depositUpiType && 'active'}`} onClick={() => {
                                                                        setDepositUpiType(depositeTypes?.slug)
                                                                        setUpiImage(depositeTypes?.image)
                                                                    }} >
                                                                        <figure><img src={depositeTypes?.image} /></figure>
                                                                        <p>{depositeTypes?.name}</p>
                                                                    </div>
                                                                </li>
                                                            }

                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </ul>

                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="modleRight">
                                        <div className="paymentItem mx-auto text-center">
                                            {
                                                upiImage ?
                                                    <figure>
                                                        <img src={upiImage} />
                                                    </figure>
                                                    :
                                                    <p className='text-white'>SELECT UPI</p>
                                            }
                                        </div>
                                        <div className="row justify-content-center text-light mt-4">

                                            <div className="col-md-10">
                                                <form className="formBox" onSubmit={handleOnSelect}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Enter Deposit Amount</label>
                                                        <input type="text" className="form-control" placeholder="&#8377; 0" value={depositeAmount} onChange={(e) => handleSetAmount(e)} />
                                                        <div className="text-danger">{error}</div>
                                                        <div className="form-text">Min 100 INR - Max 40000 INR</div>
                                                    </div>
                                                    {PromotionsList?.data?.data?.length > 0 ?
                                                        <div className="input-group DepositBonus mb-3">
                                                            <button type="button" className="btn btn-danger btnGIft"><img src="images/gift-box.svg" /></button>
                                                            <button type="button" className="btn btn-secoundry dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {bonusDetails}
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                                {PromotionsList?.data?.data?.map((Promotion_details: any, Promotion_details_key: any) => {
                                                                    return (
                                                                        <Fragment key={Promotion_details_key}>
                                                                            {Promotion_details?.Event == "deposit" || Promotion_details?.Event == "deposit first" ?
                                                                                <li><a onClick={() => { selectBonus(Promotion_details) }} className="dropdown-item">{Promotion_details?.Name?.en}</a></li>
                                                                                :
                                                                                ""
                                                                            }
                                                                        </Fragment>
                                                                    )
                                                                })}
                                                            </ul>

                                                        </div>
                                                        : ""}
                                                    <button type="submit" className="btn btn-success w-100 py-2">Deposit {depositeAmount} INRM<span>& GET CASINO</span></button>
                                                    <button type="button" className="btn btn-success d-none w-100 depositePage" data-bs-target="#paymentRequet" data-bs-toggle="modal">DepositeDetailsTemp</button>
                                                </form>
                                                <p className="text-center mt-4">Processing time: <strong>Instant - 5 Min</strong></p>
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

export default DepositMethods