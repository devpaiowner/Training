import React, { Fragment, useEffect, useState, useRef } from 'react'
import GamesLikeThis from './GamesLikeThis'
import { RouteConfig } from '@/Config/CommonConfig'
import { useRouter } from 'next/navigation'
import { GetGameAction, GetGameDetailsAction } from '@/Redux/Actions/GameAction'
import { useDispatch, useSelector } from 'react-redux'
import { decodeID, encodeID, formatDateToCustomIST, getFromLocalStorage } from '@/utils/Helper'
import Spinner from '@/Component/Layouts/Spinner'
import { GenerateRandomUpiAction } from '@/Redux/Actions/PaymentAction'
import Link from 'next/link'

const Index = (props: any) => {

    const dispatch = useDispatch<any>();
    const router = useRouter();
    const gameId = decodeID(props?.data?.gameId);
    const isDemo = props?.data?.isDemo;
    const containerRef: any = useRef(null);
    const demo: any = isDemo === 'true' ? 1 : 0;
    const [isSmallScreen, setIsSmallScreen]: any = useState(true)
    const [showGameScreen, setShowGameScreen]: any = useState(isSmallScreen ? false : true)
    const user = useSelector((state: any) => state.UserGetProfileState);
    const GetGame: any = useSelector((state: any) => state.GetGameState)
    const GetGameDetails = useSelector((state: any) => state.GetGameDetailsState)
    const userWalletBalance = useSelector((state: any) => state.UserWalletBalanceUpdateSocketState);

    let userID: any = ""
    if (getFromLocalStorage('UserDetails')) {
        const playxuser: any = getFromLocalStorage('UserDetails')
        if (playxuser != undefined) {
            const userDetails = JSON.parse(playxuser)
            userID = userDetails?._id
        }
    }

    useEffect(() => {
        function handleScreenSizeChange() {
            const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const mobileThreshold = 1024 + 1;
            setIsSmallScreen(screenWidth < mobileThreshold);
            setShowGameScreen(screenWidth > mobileThreshold)
        }
        // window.addEventListener('resize', handleScreenSizeChange);
        handleScreenSizeChange();
        // return () => {
        // window.removeEventListener('resize', handleScreenSizeChange);
        // };
    }, []);

    useEffect(() => { //Api call to fetch Game
        if (gameId != "") {
            if (!isSmallScreen) {
                if (!GetGame?.data) {
                    dispatch(GetGameAction({
                        "game_id": Number(gameId),
                        "user_ip": "1.39.255.255",
                        "is_raw": 1,
                        "user_id": userID,
                        "is_demo": demo
                    }))
                }
            }

            if (!GetGameDetails?.data) {
                dispatch(GetGameDetailsAction({
                    "game_id": Number(gameId),
                    "user_ip": "1.39.255.255",
                    "is_raw": 0,
                    "user_id": userID,
                    "is_demo": demo
                }))
            }
        }
    }, [gameId, isSmallScreen]);

    const handlePlayGame = () => {
        setShowGameScreen(true)
        dispatch(GetGameAction({
            "game_id": Number(gameId),
            "user_ip": "1.39.255.255",
            "is_raw": 1,
            "user_id": userID,
            "is_demo": demo
        }))
    }
    const demoset = (e: any) => {
        const status = e?.target?.checked
        if (status) {
            router.push(`${RouteConfig?.GamePage}?game_id=${encodeID(gameId)}&is_demo=true`)
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } else {
            router.push(`${RouteConfig?.GamePage}?game_id=${encodeID(gameId)}`)
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        }
    }

    const handleFullScreen = () => {
        const elem: any = $('.gameBody')[0];
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }

    useEffect(() => { // Clear Game data when left 
        return () => {
            dispatch({
                type: "GET_GAME_FAIL",
                data: null
            })
            dispatch({
                type: "GET_GAME_DETAILS_FAIL",
                data: null
            })
        }
    }, []);

    useEffect(() => {
        if (GetGame?.data && containerRef.current) {
            containerRef.current.innerHTML = GetGame?.data;
            const scriptTag = containerRef.current.querySelector('script');
            if (scriptTag) {
                const scriptContent = scriptTag.textContent;
                const scriptElement = document.createElement('script');
                scriptElement.textContent = scriptContent;
                document.body.appendChild(scriptElement);
            }
        }
    }, [GetGame]);

    const handleStopGame = () => {
        setShowGameScreen(false)
        containerRef.current.innerHTML = '';
    }
     
    return (
        <>
            {(GetGameDetails?.loading && GetGame?.loading) && <Spinner />}
            <section className="pb-5 bg-gredient hoverTitle">
                <div className="gameBox">
                    <div className="gameCover">
                        <img src={GetGameDetails?.data?.data?.detail?.full_image_path ? GetGameDetails?.data?.data?.detail?.full_image_path : "images/game-bg.jpeg"} />
                    </div>
                    <div className={`mobilepageWindow ${showGameScreen && 'd-none'}`}>
                        <button onClick={() => router.back()} type="button" className="btn btn-secoundry ms-auto  py-1 px-2"><span className="icon-cancel"></span></button>
                        <div className='playBoxs'>
                            <a className='btnplay mx-auto' onClick={handlePlayGame}><i className="fa-solid fa-play"></i></a>
                        </div>
                        <div className="form-check form-switch">
                            {
                                GetGameDetails?.data?.data?.detail?.has_demo ?
                                    <Fragment>
                                        <input checked={demo == "1" ? true : false} onChange={(e) => { demoset(e) }} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Demo mode</label>
                                    </Fragment>
                                    :
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Live mode</label>
                            }
                        </div>
                    </div>
                    <div className={`gameContent ${!showGameScreen && 'd-none'}`}>
                        <div className="gameHeader d-none d-xl-flex">
                            <div className="gameTitle">
                                <h6>{GetGameDetails?.data?.data?.detail?.name}</h6>
                            </div>
                            <div className="gameOption mb-2">
                                <button type="button" className="btn btn-secoundry me-2" onClick={handleFullScreen}><span className="icon-expand"></span></button>
                                <button onClick={() => router.back()} type="button" className="btn btn-secoundry"><span className="icon-cancel"></span></button>
                            </div>
                        </div>
                        <div className='gameHeaderMobile d-xl-none'>
                            <Link className="navbar-brand text-light" href={RouteConfig?.Home}>
                                Playxchip</Link>
                            <button type="button" className="btn btn-outline-light" >
                                ₹ {userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.Wallet_balance).toFixed(2) : parseFloat(user?.data?.data?.Wallet_balance).toFixed(2)}INR
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#makeDeposit" onClick={() => dispatch(GenerateRandomUpiAction({}))}>Deposit</button>
                            <button onClick={handleStopGame} type="button" className="btn btn-secoundry"><span className="icon-cancel"></span></button>
                        </div>
                        <div className="gameBody">
                            <div ref={containerRef} className='gameParentContainer'></div>
                        </div>
                        <div className="gameFooter mt-2">
                            <div className="form-check form-switch">
                                {
                                    GetGameDetails?.data?.data?.detail?.has_demo ?
                                        <>
                                            <input checked={demo == "1" ? true : false} onChange={(e) => { demoset(e) }} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Demo mode</label>
                                        </>
                                        :
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Live mode</label>
                                }
                            </div>
                            <div className="gameDate">{formatDateToCustomIST(new Date())}</div>
                        </div>
                    </div>
                </div>
                <GamesLikeThis categories={GetGameDetails?.data?.data?.detail?.categories} game_id={GetGameDetails?.data?.data?.detail?.game_id} />
            </section>

        </>
    )
}

export default Index