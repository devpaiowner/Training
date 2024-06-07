import { GETAPI } from '@/API/Api'
import { ApiConfig } from '@/Config/CommonConfig'
import React, { Fragment, useEffect, useState } from 'react'
import Spinner from '../Layouts/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GetPromotionsAction } from '@/Redux/Actions/HomeAction'
import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config'
import { RouteConfig } from '@/Config/CommonConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const AppliedBonus = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [data, setData]: any = useState([])
    const [isBonusApplied, setIsBonusApplied] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = useSelector((state: any) => state.UserGetProfileState);
    const [isCopied, setIsCopied] = useState(false)
    const PromotionsList = useSelector((state: any) => state.GetPromotionsState);

    const [promotionDetails, setPromotionDetails] = useState('');

    useEffect(() => {
        if (user?.data?.data) {
            let payload = {
                "user_id": user?.data?.data?._id
            }
            dispatch(GetPromotionsAction(payload))
        }
    }, [user])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await GETAPI(ApiConfig?.GetSetting).then((response) => {
                if (response) {
                    setData(response?.data[0])
                }
            })
            setLoading(false)
        };

        fetch();
    }, [])

    const handleCopyPlayerId = () => {
        if (isCopied) {
            return;
        }
        setIsCopied(true)
        navigator.clipboard.writeText(user?.data?.data?.referral_code)
        toast.success("Copied.")
        setTimeout(() => {
            setIsCopied(false)
        }, 3000);
    }

    return (
        <>
            {loading && <Spinner />}
            <div className="col-md-12 col-lg-9">
                <section className="accountRight h-100">
                    <div className="justify-content-between align-items-center">
                        <div className="d-flex">
                            {/* <Link href={RouteConfig?.Home} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></Link> */}
                            <button onClick={() => router.back()} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></button>
                            <h3 className="hTitle hLine">Applied Bonus</h3>
                        </div>
                        <div className="col-md-12 col-lg-12">
                            <div className="promationRow">
                                {PromotionsList?.data?.data?.length > 0 &&
                                    PromotionsList?.data?.data?.map((promotion_data: any, promotion_key: any) => {
                                        return (
                                            <Fragment key={promotion_key}>
                                                {promotion_data?.Selected == "1" ?
                                                    <>
                                                        {isBonusApplied === false && setIsBonusApplied(true)}

                                                        <div className="cardBox1 ">
                                                        <figure><img src={promotion_data?.Image?.en ? promotion_data?.Image?.en : PLAYXCHIP_DEFAULT_IMAGE_URL} /></figure>
                                                        <h6>{promotion_data?.Name?.en}</h6>
                                                        {/* <p>{promotion_data?.Description?.en}</p> */}
                                                        {/* <button type="button" className="btn btn-light">DEPOSIT & GET</button> */}        
                                                        <a className="btn btn-light flex-fill" onClick={()=>{setPromotionDetails(promotion_data?.Description?.en)}} data-bs-toggle="modal" data-bs-target="#makeappliedDepositInfo">info</a>
                                                        {/* <button type="button" className="btn btnBlue w-75">DEPOSIT & GET</button> */}
                                                    </div>
                                                    </>
                                                    : ""}
                                            </Fragment>
                                        )
                                    })
                                }
                                {
                                    isBonusApplied === false &&
                                    <h1 className="text-center">No Bonus Applied</h1>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="modal moder_s1 fade" id="makeappliedDepositInfo" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body p-4 text-center">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div dangerouslySetInnerHTML={{ __html: promotionDetails }} /> 
                            {/* <h2>Maxi-Monday</h2>
                            <h5>Get 25 Free Bets every week</h5>
                            <ul className='text-start my-4'>
                                <li>1. Choose 'Maxi-Monday' in Promotions</li>
                                <li>2. Deposit 500+ on Monday</li>
                                <li>3. Receive 25 Free Bets in JetX by SmartSoft Gaming</li>
                                <li>4. Activate in Rewards</li>
                                <li>5. Repeat on the next Monday</li>
                            </ul>
                            <p><u>Maxi-Monday Bonus T&C apply.</u></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppliedBonus