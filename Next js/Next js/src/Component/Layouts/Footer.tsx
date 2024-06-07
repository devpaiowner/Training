import { RouteConfig } from '@/Config/CommonConfig'
import { CopyRightYear, isUserLoggedIn } from '@/Config/Config'
import { encodeID } from '@/utils/Helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
    const router = useRouter();

    const handleNavigate = (route: any, type: any = 'private') => {
        if (isUserLoggedIn() || type === 'public') {
            router.push(route)
        } else {
            $('#loginModalButton').click()
        }
    }

    return (
        <footer>
            <div className="footer-top">
                <div className="container-fluid">
                    <div className="row gy-4 d-none d-lg-flex">
                        <div className="col-lg-3">
                            <h6>Contact Info</h6>
                            <p>If you have any questions?</p>
                            <button type="button" className="btn btn-dark" onClick={() => handleNavigate(RouteConfig?.HelpCenter, 'public')}>GET ANSWERS</button>
                        </div>
                        <div className="col-md-9 col-lg-6">
                            <div className="row">
                                <div className="col-6 col-md-4">
                                    <h6>Games</h6>
                                    <ul>
                                        <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`)}>Slots</a></li>
                                        <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Live Casino')}&category_id=${encodeID(37)}`)}>Live Casino</a></li>
                                        <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Instant Games')}&category_id=${encodeID(3604)}`)}>Instant Games</a></li>
                                        <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Jackpot Games')}&category_id=${encodeID(13)}`)}>Jackpot Games</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-md-4">
                                    <h6>About</h6>
                                    <ul>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>About Us</Link></li>
                                        <li><a style={{ cursor: 'pointer' }} onClick={() => handleNavigate(RouteConfig?.Promotions, 'public')}>Promotions</a></li>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>Help Center</Link></li>
                                        {/* <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>Affiliate Program</Link></li> */}
                                        {/* <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>Awards & Certificates</Link></li> */}
                                        {/* <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>App</Link></li> */}
                                    </ul>
                                </div>
                                <div className="col-6 col-md-4">
                                    <h6>Legal Information</h6>
                                    <ul>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=terms_and_condition`}>General Terms & Conditions</Link></li>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=policy`}>Responsible Gaming Policy</Link></li>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=rules`}>Sports Betting Rules</Link></li>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=privacypolicy`}>Privacy and Cookies Policy</Link></li>
                                        <li><Link href={`${RouteConfig?.PaymentMethods}`}>Payment Methods</Link></li>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=casinotermsconditions`}>Casino Bonus Terms & Conditions</Link></li>
                                        <li><Link href={`${RouteConfig?.Pages}?slug=limits`}>Limits</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-lg-3">
                            <h6>Follow Us On</h6>
                            <div className="social">
                                <a href="#"><img src="images/facebook.svg" /></a>
                                <a href="#"><img src="images/linkedin.svg" /></a>
                                <a href="#"><img src="images/twitter.svg" /></a>
                                <a href="#"><img src="images/youtube.svg" /></a>
                                <a href="#"><img src="images/tiktok-white.svg" /></a>
                            </div>
                        </div>
                    </div>
                    <div className='NavAcrodian d-lg-none'>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Games
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <ul>
                                            <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`)}>Slots</a></li>
                                            <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Live Casino')}&category_id=${encodeID(37)}`)}>Live Casino</a></li>
                                            <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Instant Games')}&category_id=${encodeID(3604)}`)}>Instant Games</a></li>
                                            <li><a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Jackpot Games')}&category_id=${encodeID(13)}`)}>Jackpot Games</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        About
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <ul>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>About Us</Link></li>
                                            <li><a href='javascript:void(0);' style={{ cursor: 'pointer' }} onClick={() => handleNavigate(RouteConfig?.Promotions, 'public')}>Promotions</a></li>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>Help Center</Link></li>
                                            {/* <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>Affiliate Program</Link></li> */}
                                            {/* <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>Awards & Certificates</Link></li> */}
                                            {/* <li><Link href={`${RouteConfig?.Pages}?slug=about_us`}>App</Link></li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Legal Information
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <ul>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=terms_and_condition`}>General Terms & Conditions</Link></li>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=policy`}>Responsible Gaming Policy</Link></li>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=rules`}>Sports Betting Rules</Link></li>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=privacypolicy`}>Privacy and Cookies Policy</Link></li>
                                            <li><Link href={`${RouteConfig?.PaymentMethods}`}>Payment Methods</Link></li>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=casinotermsconditions`}>Casino Bonus Terms & Conditions</Link></li>
                                            <li><Link href={`${RouteConfig?.Pages}?slug=limits`}>Limits</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <h5>Follow Us On</h5>
                            <div className="social">
                                <a href="#"><img src="images/facebook.svg" /></a>
                                <a href="#"><img src="images/linkedin.svg" /></a>
                                <a href="#"><img src="images/twitter.svg" /></a>
                                <a href="#"><img src="images/youtube.svg" /></a>
                                <a href="#"><img src="images/tiktok-white.svg" /></a>
                            </div>
                        </div>

                    </div>
                    <div className="paymentsupport">
                        <ul>
                            {/* <li><img src="images/payment/payment-1.svg" /></li> */}
                            <li><img src="images/payment/payment-2.svg" /></li>
                            {/* <li><img src="images/payment/payment-3.svg" /></li>
                            <li><img src="images/payment/payment-4.svg" /></li> */}
                            <li><img src="images/payment/payment-5.svg" /></li>
                            <li><img src="images/payment/payment-6.svg" /></li>
                            <li><img src="images/payment/payment-7.svg" /></li>
                            {/* <li><img src="images/payment/payment-8.svg" /></li> */}
                        </ul>
                    </div>
                </div>

            </div>

           
            <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 150 64"
                preserveAspectRatio="none"
                shapeRendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className="moving-waves">
                    <use xlinkHref="#gentle-wave" x={48} y={-1} fill="rgba(56,56,56,0.40)" />
                    <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(56,56,56,0.35)" />
                    <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(56,56,56,0.25)" />
                    <use xlinkHref="#gentle-wave" x={48} y={8} fill="rgba(56,56,56,0.20)" />
                    <use xlinkHref="#gentle-wave" x={48} y={13} fill="rgba(56,56,56,0.15)" />
                    <use xlinkHref="#gentle-wave" x={48} y={16} fill="rgba(16,16,16,1)" />
                </g>
            </svg>
            <div className="copyright" style={{backgroundColor:"#101010"}}>
                <div className="container text-center">
                    <p className="pt-4 pb-2 mb-0">Copyright © {CopyRightYear} PLAYXCHIP. All Rights Reserved.</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer