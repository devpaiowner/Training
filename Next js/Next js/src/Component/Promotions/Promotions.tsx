import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { GetPromotionsAction } from '@/Redux/Actions/HomeAction';
import Spinner from '../Layouts/Spinner';
import { PLAYXCHIP_DEFAULT_IMAGE_URL, isUserLoggedIn } from '@/Config/Config'
import { saveToSessionStorage } from '@/utils/Helper';
import { GenerateRandomUpiAction } from '@/Redux/Actions/PaymentAction';
const Promotions = () => {
    const dispatch = useDispatch<any>();
    const PromotionsList = useSelector((state: any) => state.GetPromotionsState);
    const user = useSelector((state: any) => state.UserGetProfileState);
    const [promotionDetails, setPromotionDetails] = useState('');


    useEffect(() => {
        if (user?.data?.data) {
            let payload = {
                "user_id": user?.data?.data?._id
            }
            dispatch(GetPromotionsAction(payload))
        } else {
            dispatch(GetPromotionsAction({}))
        }
    }, [user?.data?.data])

    const handleDeposite = (promotions: any) => {
        dispatch(GenerateRandomUpiAction({}))
        const bonus_details = {
            name: promotions?.Name?.en,
            id: promotions?.ID
        }
        saveToSessionStorage('bonus_details', JSON.stringify(bonus_details))
    }

    useEffect(() => {
        return () => {
            dispatch({ type: "GET_PROMOTIONS_LIST_FAIL", data: null })
        }
    }, [])
    return (
        <Fragment>
            {PromotionsList?.loading && <Spinner />}
            <main>
                <section className="py-5 bg-gredient hoverTitle">
                    <div className="container-fluid">
                        <div className="d-flex">
                            <a href="#" className="backArrow"><i className="icon-arrow-right"></i></a>
                            <h3 className="hTitle hLine">All Games</h3>
                        </div>
                        <div className="row gy-4">

                            <Sidebar />
                            <div className="col-md-8 col-lg-9">
                                <div className="promationRow">
                                    {PromotionsList?.data?.data?.length > 0 &&
                                        PromotionsList?.data?.data?.map((promotion_data: any, promotion_key: any) => {
                                            return (
                                                <Fragment key={promotion_key}>
                                                    <div className="cardBox1 ">
                                                        <figure><img src={promotion_data?.Image?.en ? promotion_data?.Image?.en : PLAYXCHIP_DEFAULT_IMAGE_URL} /></figure>
                                                        <h6>{promotion_data?.Name?.en}</h6>
                                                        {/* <p>{promotion_data?.Description?.en}</p> */}
                                                        {/* <button type="button" className="btn btn-light">DEPOSIT & GET</button> */}
                                                        <a className="btn btn-light flex-fill" data-bs-toggle="modal" data-bs-target="#makeDeposit" onClick={() => handleDeposite(promotion_data)}>DEPOSIT & GET</a>        
                                                        <a className="btn btn-light flex-fill ms-2" onClick={()=>{setPromotionDetails(promotion_data?.Description?.en)}} data-bs-toggle="modal" data-bs-target="#makeDepositInfo">info</a>
                                                        {/* <button type="button" className="btn btnBlue w-75">DEPOSIT & GET</button> */}
                                                    </div>
                                                </Fragment>
                                            )
                                        })

                                    }
                                    {/* <div className="cardBox1">
                                        <img src="images/image-1.png" />
                                        <h6>1st Welcome</h6>
                                        <p>Bonus 100% up to ₹20,000</p>
                                        <button type="button" className="btn btnBlue w-75">DEPOSIT & GET</button>
                                    </div>
                                    <div className="cardBox1">
                                        <img src="images/image-1.png" />
                                        <h6>1st Welcome</h6>
                                        <p>Bonus 100% up to ₹20,000</p>
                                        <button type="button" className="btn btnBlue w-75">DEPOSIT & GET</button>
                                    </div> */}
                                    {/* <div className="cardBox2">
                                        <div className="topRow"><span className="activate">AVAILABLE</span> <button type="button" className="btn"><i className="fa-solid fa-circle-info"></i></button></div>
                                        <img src="images/img_2023.png" />
                                        <h6>Slots Cashback</h6>
                                        <p>Get up to ₹8,000 daily</p>
                                        <button type="button" className="btn btnBlue w-75 mt-4">Wanna get</button>
                                        <div className="diveder"><span></span></div>
                                    </div>
                                    <div className="cardBox2">
                                        <div className="topRow"><span className="activate">AVAILABLE</span> <button type="button" className="btn"><i className="fa-solid fa-circle-info"></i></button></div>
                                        <img src="images/img_2023.png" />
                                        <h6>Slots Cashback</h6>
                                        <p>Get up to ₹8,000 daily</p>
                                        <button type="button" className="btn btnBlue w-75 mt-4">Wanna get</button>
                                        <div className="diveder"><span></span></div>
                                    </div>
                                    <div className="cardBox2">
                                        <div className="topRow"><span className="activate">AVAILABLE</span> <button type="button" className="btn"><i className="fa-solid fa-circle-info"></i></button></div>
                                        <img src="images/img_2023.png" />
                                        <h6>Slots Cashback</h6>
                                        <p>Get up to ₹8,000 daily</p>
                                        <button type="button" className="btn btnBlue w-75 mt-4">Wanna get</button>
                                        <div className="diveder"><span></span></div>
                                    </div>
                                    <div className="cardBox3">
                                        <div className="topRow"><span className="activate">Active</span> <span className="timer">End 17 d. 23:53:30</span></div>
                                        <figure><img src="images/img-2.jpg" /></figure>
                                        <div className="bottomHover">
                                            <h6>$60,000</h6>
                                            <p>HalloWins</p>
                                        </div>
                                    </div>
                                    <div className="cardBox3">
                                        <div className="topRow"><span className="activate">Active</span> <span className="timer">End 17 d. 23:53:30</span></div>
                                        <figure><img src="images/img-2.jpg" /></figure>
                                        <div className="bottomHover">
                                            <h6>$60,000</h6>
                                            <p>HalloWins</p>
                                        </div>
                                    </div>
                                    <div className="cardBox3">
                                        <div className="topRow"><span className="activate">Active</span> <span className="timer">End 17 d. 23:53:30</span></div>
                                        <figure><img src="images/img-2.jpg" /></figure>
                                        <div className="bottomHover">
                                            <h6>$60,000</h6>
                                            <p>HalloWins</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <!-- Modal --> */}
            <div className="modal moder_s1 fade" id="makeDepositInfo" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        </Fragment>
    )
}

export default Promotions