import React, { useEffect, useState } from 'react'
import LoginModal from '../Auth/Login/LoginModal'
import RegisterModal from '../Auth/Register/RegisterModal'
import ForgotPasswordModal from '../Auth/ForgotPassword/ForgotPasswordModal'
import DepositMethods from '../Payments/Deposit/DepositMethods'
import DepositRequest from '../Payments/Deposit/DepositRequest'
import UserLoginPasswordModal from '../Auth/Register/UserLoginPasswordModal'
import WithdrawalMethods from '../Payments/Withdrawal/WithdrawalMethods'
import WithdrawaBankDetails from '../Payments/Withdrawal/WithdrawaBankDetails'
import { ServerImageUrl, decodeID, encodeID, getFromLocalStorage, removeFromLocalStorage } from '@/utils/Helper'
import Link from 'next/link'
import { RouteConfig } from '@/Config/CommonConfig'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { UserGetProfile, UserLogout } from '@/Redux/Actions/AuthAction'
import { PLAYXCHIP_DEFAULT_IMAGE_URL, PLAYXCHIP_LOGO, isUserLoggedIn } from '@/Config/Config'
import $ from "jquery";
import { headerList } from '@/utils/Json'
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { format } from "timeago.js";
import Swal from 'sweetalert2'
import { GenerateRandomUpiAction } from '@/Redux/Actions/PaymentAction'
import { GetNotificationsAction } from '@/Redux/Actions/HomeAction'
import { SocketEmit, socketInit } from '@/utils/Socket'
import { toast } from 'react-toastify'

declare global {
   interface Window {
      Tawk_API?: any; // Adjust the type accordingly based on Tawk.to's documentation
   }
}

const Header = () => {

   const pathName = usePathname();
   const searchParams = useSearchParams();
   const encodedTitle = searchParams.get('title');
   const gamePageTitle = decodeID(encodedTitle);
   const router = useRouter();
   const dispatch = useDispatch<any>();
   const [userAuthenticate, setUserAuthenticate] = useState(false)
   const user = useSelector((state: any) => state.UserGetProfileState);
   const userLogout = useSelector((state: any) => state.UserLogoutState);
   const notifications = useSelector((state: any) => state.GetNotificationState);
   const userWalletBalance = useSelector((state: any) => state.UserWalletBalanceUpdateSocketState);
   // const totalBonusAmount = user?.data?.data?.bonuses?.length > 0 ? user?.data?.data?.bonuses.reduce((sum: any, item: any) => parseInt(sum) + parseInt(item.amount), 0) : 0;
   const totalBonusAmount = userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.totalBonus).toFixed(2) : parseFloat(user?.data?.data?.totalBonus).toFixed(2)
   // console.log("userWalletBalance?.data?.totalBonus", userWalletBalance?.data?.totalBonus);


   useEffect(() => {
      if (typeof window !== 'undefined') {
         const userToken = getFromLocalStorage('isUserLoginToken')
         setUserAuthenticate(userToken ? true : false)
         if (userToken) {
            dispatch(UserGetProfile({}));
            socketInit(dispatch)
         }
      }
   }, [])

   useEffect(() => {
      if (user?.data?.data?.uuid) {
         SocketEmit("join", {
            "userId": user?.data?.data?.uuid,
            "userName": user?.data?.data?.username
         })
      }

      setTimeout(() => {
         if (user?.data?.data?.uuid) {
            SocketEmit("getprofile", {
               "userId": user?.data?.data?.uuid,
            })
         }
      }, 2000);
   }, [user])



   const handleNavigate = (route: any, type: any = 'private') => {
      $('.btn-close-menu').click();
      if (isUserLoggedIn() || type == 'public') {
         // route && router.push(route)
         router.push(route)
      } else {
         $('#loginModalButton').click()
      }
   }

   const handleLogOut = () => {
      Swal.fire({
         title: VALIDATION_MESSAGE?.LOGOUT_MODEL_TITLE,
         text: VALIDATION_MESSAGE?.LOGOUT_MODEL_TEXT,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#31CE36',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Ok'
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(UserLogout({}))
         }
      });
   }

   useEffect(() => {
      if (userLogout?.data?.status) {
         removeFromLocalStorage('isUserLoginToken')
         removeFromLocalStorage('UserDetails')
         window.location.href = RouteConfig?.Home

         // setTimeout(() => {
         //    window.location.href = RouteConfig?.Home
         // }, 2000);
      }
   }, [userLogout])

   useEffect(() => {
      if (isUserLoggedIn()) {
         dispatch(GetNotificationsAction({}))
      }
   }, [])

   function openLiveChat() {
      if (window.Tawk_API) {
         window.Tawk_API.toggle();
      }
   }

   const handleDeposit = () => {
      dispatch(GenerateRandomUpiAction({}))
   }
   return (
      <>
         <header>
            <nav className="navbar navbar-expand-lg fixed-top">
               <div className="container-fluid">
                  <div className="row g-0 w-100 align-items-center">
                     <div className="col-lg-2 col-xl-3 d-flex">
                        <button className="btn text-light p-1 d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasheaderMenu" aria-controls="offcanvasheaderMenu">
                           <span className="fa-solid fa-bars"></span>
                        </button>
                        <Link className="navbar-brand text-light" href={RouteConfig?.Home}>
                           <img className='Main-Logo' src={PLAYXCHIP_LOGO} alt="logo" /></Link>
                        <div className="d-flex d-lg-none ms-auto justify-content-end align-items-center">
                           {
                              userAuthenticate ?
                                 <>
                                    <div className="dropdown">
                                       <button className="btn btn-outline-light depositBTN h-100 dropdown-toggle me-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="20,0">
                                          ₹ {userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.Wallet_balance).toFixed(2) : parseFloat(user?.data?.data?.Wallet_balance).toFixed(2)} INR
                                       </button>
                                       <div className="dropdown-menu dropdown-menu-end dePositDRopdown">
                                          <div className='p-3 d-flex'><img className='me-3' src="images/indianruppe.svg" /> Indian Rupee</div>
                                          <div>
                                             <hr className="dropdown-divider" />
                                          </div>
                                          <div className='p-3'>
                                             <h5 className='fw-600'>Real: {userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.Wallet_balance).toFixed(2) : parseFloat(user?.data?.data?.Wallet_balance).toFixed(2)} INR</h5>
                                             {/* <p>Real: {parseFloat(user?.data?.data?.withdrawAmount).toFixed(2)} INR</p> */}
                                             <p>Bonus: {totalBonusAmount} INR</p>
                                          </div>
                                          <div className='p-3 d-flex align-items-center'>
                                             <a className="btn btn-light flex-fill" data-bs-toggle="modal" data-bs-target="#makeDeposit" onClick={() => handleDeposit()}>Deposit</a>
                                             <a className="btn btn-info flex-fill ms-3" data-bs-toggle="modal" data-bs-target="#Paymentwithdrawal">Withdrawal</a>
                                          </div>
                                       </div>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#makeDeposit" onClick={() => dispatch(GenerateRandomUpiAction({}))}>+</button>
                                    <div className="userPIC ms-2">
                                       <Link href={`${RouteConfig?.Profile}?=account-options`}>
                                          <figure><img src="images/user-default.png" /></figure>
                                       </Link>
                                    </div>
                                    <div className="dropdown ExtraMenu d-none d-lg-block">
                                       <button className="ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                          <i className="fa-solid fa-bars"></i>
                                       </button>
                                       <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                          <li>
                                             <Link className={`dropdown-item ${(pathName === RouteConfig?.Home && 'active')}`} href={RouteConfig?.Home}><span className="icon-gift"></span> Home </Link>
                                          </li>
                                          <li>
                                             <a className={`dropdown-item ${(pathName === RouteConfig?.GamesList && 'active')}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="icon-gift"></span> Games <span className="downICon icon-angle-down"></span></a>
                                             <div className="SUbmenu collapse" id="collapseExample">
                                                <ul>
                                                   <li><a className="dropdown-item" href="#">Instant Games (N A)</a></li>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`}>
                                                         Slots</Link>
                                                   </li>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Jackpots')}&category_id=${encodeID(13)}`}>
                                                         Jackpot Games</Link>
                                                   </li>
                                                   <li><a className="dropdown-item" href="#">Mega Ways (N A)</a></li>
                                                   <li><a className="dropdown-item" href="#">Book (N A)</a></li>
                                                   <li><a className="dropdown-item" href="#">Provably Fair (N A)</a></li>
                                                   <li><Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Virtual Sports')}&category_id=${encodeID(84)}`}>Virtual Sports</Link></li>
                                                   <li><a className="dropdown-item" href="#">Lottery Games (N A)</a></li>
                                                </ul>
                                             </div>
                                          </li>
                                          <li>
                                             <a className="dropdown-item" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="icon-gift"></span> Live casino <span className="downICon icon-angle-down"></span></a>
                                             <div className="SUbmenu collapse" id="collapseExample1">
                                                <ul>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Baccarat')}&category_id=${encodeID(1364)}`}>
                                                         Baccarat</Link>
                                                   </li>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Blackjack')}&category_id=${encodeID(41)}`}>
                                                         Blackjack</Link>
                                                   </li>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Roulette')}&category_id=${encodeID(1366)}`}>
                                                         Roulette</Link>
                                                   </li>
                                                   <li><a className="dropdown-item" href="#">Andar Bahar(N A)</a></li>
                                                </ul>
                                             </div>
                                          </li>
                                          <li>
                                             <a className="dropdown-item" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="icon-gift"></span> Sport (N A)<span className="downICon icon-angle-down"></span></a>
                                             <div className="SUbmenu collapse" id="collapseExample2">
                                                <ul>
                                                   <li><a className="dropdown-item" href="#">Live Betting</a></li>
                                                   <li><a className="dropdown-item" href="#">Cricket</a></li>
                                                </ul>
                                             </div>
                                          </li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Lucky Coin (N A)</a></li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Highroller Party (N A)</a></li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Lucky Loot (N A)</a></li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Tournaments (N A)</a></li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Personality Quiz (N A)</a></li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> About Crypto (N A)</a></li>
                                          <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> More (N A)</a></li>
                                          <li>
                                             <hr className="dropdown-divider" />
                                          </li>
                                          <li className='d-flex p-3'>
                                             <button type='button' className='btn btn-primary text-nowrap flex-fill me-2' onClick={() => handleNavigate(RouteConfig?.HelpCenter, 'public')}>
                                                <i className="fa-regular fa-circle-question"></i>
                                                Help Center
                                             </button>
                                             <button type='button' className='btn btn-light text-nowrap flex-fill' onClick={() => openLiveChat()}>
                                                <i className="fa-regular fa-message">
                                                </i>
                                                Live Support
                                             </button>
                                          </li>
                                       </ul>
                                    </div>
                                    {/* <button type="button" className="btn btn-outline-light px-4 ms-3" data-bs-toggle="modal" data-bs-target="#makeDeposit">Deposite</button>
                  <button type="button" className="btn btn-outline-light px-4 ms-3" data-bs-toggle="modal" data-bs-target="#Paymentwithdrawal">Withdrawl</button>
                  <button type="button" className="btn btn-primary px-5" onClick={handleLogOut}>Logout</button> */}
                                 </>
                                 :
                                 <>
                                    <button type="button" id='loginModalButton' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#LoginModel">Login</button>
                                    <button type="button" className="btn btn-outline-light ms-2 btn-primary" data-bs-toggle="modal" data-bs-target="#RegisterModel">Registration</button>
                                 </>
                           }
                        </div>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="fa-solid fa-bars"></span>
               </button> */}
                     </div>
                     <div className="col-lg-5 col-xl-6">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                           <ul className="navbar-nav mx-auto">
                              {/* <li className="nav-item" >
                                 <a className={`nav-link cursor-pointer`} >SPORT</a>
                              </li>
                              <li className="nav-item" >
                                 <a className={`nav-link cursor-pointer`} >LIVE BETTING</a>
                              </li> */}

                              <li className="nav-item" >
                                 <a className={`nav-link cursor-pointer ${pathName === RouteConfig?.Home && 'active'}`} onClick={() => handleNavigate(RouteConfig?.Home, 'public')}>HOME</a>
                              </li>
                              <li className="nav-item" >
                                 <a className={`nav-link cursor-pointer ${gamePageTitle === 'Live Casino' && 'active'}`} onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Live Casino')}&category_id=${encodeID(37)}`)}>LIVE CASINO</a>
                              </li>
                              <li className="nav-item" >
                                 <a className={`nav-link cursor-pointer ${gamePageTitle === 'All Games' && 'active'}`} onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('All Games')}&category_id=${encodeID("")}`)} >GAMES</a>
                              </li>
                              <li className="nav-item" >
                                 <a className={`nav-link cursor-pointer ${pathName === RouteConfig?.Promotions && 'active'}`} onClick={() => handleNavigate(RouteConfig?.Promotions, 'public')}>PROMOTIONS</a>
                              </li>
                              {/* {
                     headerList?.length > 0 &&
                     headerList?.map((navData: any, navKey: any) => {
                     const name = navData?.name;
                     const status = navData?.status;
                     const route = navData?.route;
                     return (
                     <li className="nav-item" key={navKey}>
                        <a className={`nav-link  ${(pathName === route && status) && 'active'}`} style={{ cursor: "pointer" }} onClick={() => handleNavigate(route)}>{name}</a>
                     </li>
                     )
                     })
                     } */}
                           </ul>
                        </div>
                     </div>
                     <div className="col-lg-5 col-xl-3 d-none d-lg-block">
                        <div className="d-flex justify-content-end align-items-center">
                           <button type="button" className="btn p-0 f-24 me-2" onClick={() => handleNavigate(RouteConfig?.Search)}><span className="icon-search"></span></button>
                           {
                              userAuthenticate &&
                              <div className="dropdown">
                                 <button className="btn btn-outline-light me-2  position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-bell"></i>
                                    {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                       5
                                    </span> */}
                                 </button>
                                 <div className="dropdown-menu notificationLIst dropdown-menu-end dropdown-menu-dark">
                                    <ul className='list-group list-group-flush'>
                                       {notifications?.data?.data?.length > 0 ?
                                          notifications?.data?.data?.map((notification: any, notificationKey: any) => {
                                             if (notificationKey < 10) {
                                                return (
                                                   <li key={notificationKey}>
                                                      <a className="dropdown-item" href="#">
                                                         <figure>
                                                            <img src={notification?.image ? ServerImageUrl(notification?.image) : PLAYXCHIP_DEFAULT_IMAGE_URL} alt="" />
                                                         </figure>
                                                         <div>
                                                            <h6 className='d-flex'>{notification?.title} </h6>
                                                            <p>{notification?.body}</p>
                                                            <small>{format(notification?.createdAt)}</small>
                                                            {/* <small>3 days ago</small> */}
                                                         </div>
                                                      </a>
                                                   </li>
                                                )
                                             }
                                          })
                                          :
                                          <li>
                                             <h6 className='text-center'>No new notifications</h6>
                                          </li>
                                       }

                                    </ul>
                                    <div className='text-center py-2'><button type='button' className='btn btn-primary' onClick={() => handleNavigate(RouteConfig?.Notifications)}>View More</button></div>
                                 </div>
                              </div>
                           }
                           {
                              userAuthenticate ?
                                 <>
                                    <div className="dropdown">
                                       <button className="btn btn-outline-light depositBTN h-100 dropdown-toggle me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="20,0">
                                          {/* ₹ {user?.data?.data?.Wallet_balance} INR */}
                                          ₹ {userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.Wallet_balance).toFixed(2) : parseFloat(user?.data?.data?.Wallet_balance).toFixed(2)}INR
                                       </button>
                                       <div className="dropdown-menu dropdown-menu-end dePositDRopdown">
                                          <div className='p-3 d-flex'><img className='me-3' src="images/indianruppe.svg" /> Indian Rupee</div>
                                          <div>
                                             <hr className="dropdown-divider" />
                                          </div>
                                          <div className='p-3'>
                                             {/* 
                           <h5 className='fw-600'>{user?.data?.data?.Wallet_balance} INR</h5>
                           */}
                                             <h5 className='fw-600'>Real: {userWalletBalance?.status == true ? parseFloat(userWalletBalance?.data?.Wallet_balance).toFixed(2) : parseFloat(user?.data?.data?.Wallet_balance).toFixed(2)} INR</h5>
                                             {/* <p className='m-0'>Real: {parseFloat(user?.data?.data?.withdrawAmount).toFixed(2)} INR</p> */}
                                             <p>Bonus: {totalBonusAmount} INR</p>
                                          </div>
                                          <div className='p-3 d-flex align-items-center'>
                                             <a className="btn btn-light flex-fill" data-bs-toggle="modal" data-bs-target="#makeDeposit" onClick={() => handleDeposit()}>Deposit</a>
                                             <a className="btn btn-info flex-fill ms-3" data-bs-toggle="modal" data-bs-target="#Paymentwithdrawal">Withdrawal</a>
                                          </div>
                                       </div>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#makeDeposit" onClick={() => handleDeposit()}>Deposit</button>
                                    <div className="userPIC ms-3">
                                       <Link href={`${RouteConfig?.Profile}?=profile`}>
                                          <figure><img src="images/user-default.png" /></figure>
                                       </Link>
                                    </div>
                                    {/* 
                  <div className="dropdown userPIC ms-2">
                     <Link href={`${RouteConfig?.Profile}?=profile`} data-bs-toggle="dropdown">
                     <figure><img src="images/service-3.jpg" /></figure>
                     </Link>
                     <ul className="dropdown-menu MyAccountDown dropdown-menu-end dropdown-menu-dark">
                        <li>
                           <Link className="dropdown-item" href={`${RouteConfig?.Profile}?=profile`}>
                           My Account</Link>
                        </li>
                        <li><a style={{ cursor: "pointer" }} className="dropdown-item" onClick={handleLogOut}>Logout</a ></li>
                     </ul>
                  </div>
                  */}
                                    <div className="dropdown ExtraMenu">
                                       <button className="ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                          <i className="fa-solid fa-bars"></i>
                                       </button>
                                       <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                          <li>
                                             <Link className={`dropdown-item ${(pathName === RouteConfig?.Home && 'active')}`} href={RouteConfig?.Home}><span className="fa-solid fa-house"></span> Home </Link>
                                          </li>
                                          <li>
                                             <a className={`dropdown-item ${(gamePageTitle === 'Instant Games' || gamePageTitle === 'Slots' || gamePageTitle === 'Jackpot Games' || gamePageTitle === 'Virtual Sports') && 'active'}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="fa-solid fa-gamepad"></span> Games <span className="downICon icon-angle-down"></span></a>
                                             <div className="SUbmenu collapse" id="collapseExample">
                                                <ul>
                                                   <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Instant Games')}&category_id=${encodeID(3604)}`)}>Instant Games</a></li>
                                                   <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`)}>Slots</a></li>
                                                   <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Jackpot Games')}&category_id=${encodeID(13)}`)}>Jackpot Games</a></li>
                                                   {/* 
                                 <li><a className="dropdown-item" href="#">Mega Ways</a></li>
                                 */}
                                                   {/* 
                                 <li><a className="dropdown-item" href="#">Provably Fair</a></li>
                                 */}
                                                   <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Virtual Sports')}&category_id=${encodeID(84)}`)}>Virtual Sports</a></li>
                                                   {/* 
                                 <li><a className="dropdown-item" href="#">Lottery Games</a></li>
                                 */}
                                                </ul>
                                             </div>
                                          </li>
                                          <li>
                                             <a className={`dropdown-item ${(gamePageTitle === 'Baccarat' || gamePageTitle === 'Blackjack' || gamePageTitle === 'Roulette') && 'active'}`} data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="fa-solid fa-user-tie"></span> Live casino <span className="downICon icon-angle-down"></span></a>
                                             <div className="SUbmenu collapse" id="collapseExample1">
                                                <ul>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Baccarat')}&category_id=${encodeID(1364)}`}>
                                                         Baccarat</Link>
                                                   </li>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Blackjack')}&category_id=${encodeID(41)}`}>
                                                         Blackjack</Link>
                                                   </li>
                                                   <li>
                                                      <Link className="dropdown-item" href={`${RouteConfig?.GamesList}?title=${encodeID('Roulette')}&category_id=${encodeID(1366)}`}>
                                                         Roulette</Link>
                                                   </li>
                                                   {/* 
                                 <li><a className="dropdown-item" href="#">Andar Bahar(N A)</a></li>
                                 */}
                                                </ul>
                                             </div>
                                          </li>
                                          <li><a style={{ cursor: "pointer" }} className="dropdown-item" onClick={handleLogOut}><span className="icon-log-out"></span> Logout</a ></li>
                                          {/* 
                        <li>
                           <a className="dropdown-item" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="icon-gift"></span> Sport (N A)<span className="downICon icon-angle-down"></span></a>
                           <div className="SUbmenu collapse" id="collapseExample2">
                              <ul>
                                 <li><a className="dropdown-item" href="#">Live Betting</a></li>
                                 <li><a className="dropdown-item" href="#">Cricket</a></li>
                              </ul>
                           </div>
                        </li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Lucky Coin (N A)</a></li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Highroller Party (N A)</a></li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Lucky Loot (N A)</a></li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Tournaments (N A)</a></li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Personality Quiz (N A)</a></li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> About Crypto (N A)</a></li>
                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> More (N A)</a></li>
                        */}
                                          <li>
                                             <hr className="dropdown-divider" />
                                          </li>
                                          <li className='d-flex p-3'>
                                             <button type='button' className='btn btn-primary text-nowrap flex-fill me-2' onClick={() => handleNavigate(RouteConfig?.HelpCenter, 'public')}>
                                                <i className="fa-regular fa-circle-question"></i>
                                                Help Center
                                             </button>
                                             {/* {
                                                
                                             } */}
                                             {/* <button type='button' className='btn btn-light text-nowrap flex-fill' onClick={() => $('.tawk-button').click()}> */}
                                             <button type='button' className='btn btn-light text-nowrap flex-fill' onClick={() => openLiveChat()}>
                                                <i className="fa-regular fa-message"></i>
                                                Live Support
                                             </button>
                                          </li>
                                       </ul>
                                    </div>
                                    {/* <button type="button" className="btn btn-outline-light px-4 ms-3" data-bs-toggle="modal" data-bs-target="#makeDeposit">Deposite</button>
                  <button type="button" className="btn btn-outline-light px-4 ms-3" data-bs-toggle="modal" data-bs-target="#Paymentwithdrawal">Withdrawl</button>
                  <button type="button" className="btn btn-primary px-5" onClick={handleLogOut}>Logout</button> */}
                                 </>
                                 :
                                 <>
                                    <button type="button" id='loginModalButton' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#LoginModel">Login</button>
                                    <button type="button" className="btn btn-outline-light btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#RegisterModel">Registration</button>
                                 </>
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </nav>
         </header>

         {/* Buttons to controll Modal boxes  */}
         <button type="button" className="btn btn-outline-light px-4 ms-2 d-none" data-bs-toggle="modal" data-bs-target="#RegisterConfirm" id='userRegisterComplete'>RegisterConfirm</button>

         <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasheaderMenu" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
               <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
               <button type="button" className="btn-close-menu btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"><span className="fa-solid fa-xmark"></span></button>
            </div>
            <div className="offcanvas-body MobileExtramenu">
               <ul className="">
                  <li>
                     <Link className={`dropdown-item ${(pathName === RouteConfig?.Home && 'active')}`} href={RouteConfig?.Home}><span className="fa-solid fa-house"></span> Home </Link>
                  </li>
                  <li>
                     <a className={`dropdown-item ${(gamePageTitle === 'Instant Games' || gamePageTitle === 'Slots' || gamePageTitle === 'Jackpot Games' || gamePageTitle === 'Virtual Sports') && 'active'}`} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="fa-solid fa-gamepad"></span> Games <span className="downICon icon-angle-down"></span></a>
                     <div className="SUbmenu collapse" id="collapseExample">
                        <ul>
                           <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Instant Games')}&category_id=${encodeID(3604)}`)}>Instant Games</a></li>
                           <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`)}>Slots</a></li>
                           <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Jackpot Games')}&category_id=${encodeID(13)}`)}>Jackpot Games</a></li>
                           <li><a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Virtual Sports')}&category_id=${encodeID(84)}`)}>Virtual Sports</a></li>
                        </ul>
                     </div>
                  </li>
                  <li>
                     <a className={`dropdown-item ${(gamePageTitle === 'Baccarat' || gamePageTitle === 'Blackjack' || gamePageTitle === 'Roulette') && 'active'}`} data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="fa-solid fa-user-tie"></span> Live casino <span className="downICon icon-angle-down"></span></a>
                     <div className="SUbmenu collapse" id="collapseExample1">
                        <ul>
                           <li><a className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Baccarat')}&category_id=${encodeID(1364)}`)}>Baccarat</a></li>
                           <li><a className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Blackjack')}&category_id=${encodeID(41)}`)}>Blackjack</a></li>
                           <li><a className="dropdown-item" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Roulette')}&category_id=${encodeID(1366)}`)}>Roulette</a></li>
                           {/* <li><a className="dropdown-item" href="#">Andar Bahar(N A)</a></li> */}
                        </ul>
                     </div>
                  </li>
                  <li>
                     <li><a className={`dropdown-item ${(pathName === RouteConfig?.Promotions && 'active')}`} onClick={() => handleNavigate(RouteConfig?.Promotions)}><span className="fa-solid fa-house"></span> Promotions</a></li>
                  </li>
                  {
                     userAuthenticate &&
                     <li><a style={{ cursor: "pointer" }} className="dropdown-item" onClick={handleLogOut}><span className="icon-log-out"></span> Logout</a ></li>
                  }

                  {/* <li>
                                                            <a className="dropdown-item" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample"><span className="icon-gift"></span> Sport (N A)<span className="downICon icon-angle-down"></span></a>
                                                            <div className="SUbmenu collapse" id="collapseExample2">
                                                                <ul>
                                                                    <li><a className="dropdown-item" href="#">Live Betting</a></li>
                                                                    <li><a className="dropdown-item" href="#">Cricket</a></li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Lucky Coin (N A)</a></li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Highroller Party (N A)</a></li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Lucky Loot (N A)</a></li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Tournaments (N A)</a></li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> Personality Quiz (N A)</a></li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> About Crypto (N A)</a></li>
                                                        <li><a className="dropdown-item" href="#"><span className="icon-gift"></span> More (N A)</a></li> */}
                  <li>
                     <hr className="dropdown-divider" />
                  </li>
                  <li className='d-flex py-3'>
                     <button type='button' className='btn btn-primary text-nowrap flex-fill me-2' onClick={() => handleNavigate(RouteConfig?.HelpCenter, 'public')}>
                        <i className="fa-regular fa-circle-question"></i>
                        Help Center
                     </button>
                     <button type='button' className='btn btn-light text-nowrap flex-fill' onClick={() => openLiveChat()}>
                        <i className="fa-regular fa-message"></i>
                        Live Support
                     </button>
                  </li>
               </ul>
            </div>
         </div>

         {/* Modal boxes */}

         {/* Auth  */}
         <LoginModal />
         <RegisterModal />
         <ForgotPasswordModal />
         <UserLoginPasswordModal />
         {/* Payment  */}
         <DepositMethods />
         <DepositRequest />
         <WithdrawaBankDetails />
         <WithdrawalMethods />

      </>
   )
}

export default Header