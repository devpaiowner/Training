import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../../constants/ImageConstants'
import { Tooltip as ReactTooltip } from "react-tooltip";


const RideType = () => {

 

  return (
    <main className="main-content top-gap">
  
        <div className='container-fluid'>

            <div className='get-ride-layout'>
                <div className='row gy-4'>
                    <div className='col-xl-3'>
                        <div className='row gy-4'>
                            <div className='col-xl-12 col-sm-6'>
                                <div className='get-a-ride'>
                                    <h1 className='com-heading-2 text-white mb-3'>Get a Ride</h1>
                                    <div className="icon-input mb-3 location-search">
                                        <i className="icon-pickup grren-text"></i>
                                        <input className="com-input" type="text" placeholder="Pickup"/>
                                        <div className='location-right-btns'>
                                            <button className='search-inner-btn me-2'>
                                                <i className="icon-heart"></i>
                                            </button>
                                            <button className='search-inner-btn'>
                                                <i className="icon-close-circle"></i>
                                            </button>
                                        </div>
                                        

                                        <ul className='location-dropdwon d-none'>
                                            <li>
                                                <i className='icon-time-past'></i>
                                                <div>
                                                    <span className='place'>Stateville</span>
                                                    <p className='address'>123 Main Street, Citytown, Stateville 54321, Co...</p>
                                                </div>
                                            </li>
                                            <li>
                                                <i className='icon-time-past'></i>
                                                <div>
                                                    <span className='place'>Stateville</span>
                                                    <p className='address'>123 Main Street, Citytown, Stateville 54321, Co...</p>
                                                </div>
                                            </li>
                                            <li>
                                                <i className='icon-time-past'></i>
                                                <div>
                                                    <span className='place'>Stateville</span>
                                                    <p className='address'>123 Main Street, Citytown, Stateville 54321, Co...</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="icon-input mb-3 location-search">
                                        <i className="icon-location"></i>
                                        <input className="com-input" type="text" placeholder="Destination"/>
                                        <div className='location-right-btns'>
                                            <button className='search-inner-btn'>
                                                <i className="icon-close-circle"></i>
                                            </button>
                                        </div>
                                        <ul className='location-dropdwon'>
                                            <li className='home'>
                                                <i className='icon-heart-fill golden-text'></i>
                                                <div>
                                                    <span className='place'>Home</span>
                                                    <p className='address'>20 Square, New York, NY 10003</p>
                                                </div>
                                            </li>
                                            <li>
                                                <i className='icon-time-past'></i>
                                                <div>
                                                    <span className='place'>Stateville</span>
                                                    <p className='address'>123 Main Street, Citytown, Stateville 54321, Co...</p>
                                                </div>
                                            </li>
                                            <li>
                                                <i className='icon-time-past'></i>
                                                <div>
                                                    <span className='place'>Stateville</span>
                                                    <p className='address'>123 Main Street, Citytown, Stateville 54321, Co...</p>
                                                </div>
                                            </li>
                                            <li>
                                                <i className='icon-time-past'></i>
                                                <div>
                                                    <span className='place'>Stateville</span>
                                                    <p className='address'>123 Main Street, Citytown, Stateville 54321, Co...</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="icon-input mb-3">
                                        <i className="icon-location"></i>
                                        <a href="#" className="com-input w-100 d-flex align-items-center">Pickup Now <i className='icon-chev-btm ms-auto'></i></a>
                                    </div>

                                    <button className='com-btn w-100'>Search</button>
                                </div>
                            </div>
                            <div className='col-xl-12 col-sm-6'>
                                <div className='benifits-of-box get-a-ride h-100'>
                                    <h3 className='com-heading-2 text-white'>Benefits of scheduling a ride</h3>
                                    <ul>
                                        <li>Choose your exact pickup time up to 90 days in advance</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='col-xl-9'>
                        <div className='ride-type-box'>
                            <div className='row'>
                                <div className='col-md-7 px-2 px-md-2 pe-md-0'>
                                    <div className='ride-type-box-lft'>
                                        <h1 className='ride-type-heading text-white'>Ride Type</h1>
                                        <div className='d-flex flex-wrap'>
                                            <div className="form-check com-radio mb-3 me-4 align-items-center">
                                                <input className="form-check-input" name='Ride-Type-radio' id='Door to Door' type="radio" />
                                                <label className="form-check-label golden-text" htmlFor='Door to Door'>Door to Door</label>
                                                <div className='custom-tooltip ms-2'>
                                                    <img className='tooltip-img' data-tooltip-id="door-to-tooltip" src={Images?.ExclamationMark} alt="" />
                                                    <ReactTooltip
                                                        id="door-to-tooltip"
                                                        place="bottom"
                                                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ."
                                                        style={{maxWidth: '500px'}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-check com-radio mb-3 me-4 align-items-center">
                                                <input className="form-check-input" name='Ride-Type-radio' id='Curb to Curb' type="radio" />
                                                <label className="form-check-label golden-text" htmlFor='Curb to Curb' >Curb to Curb </label>
                                                <div className='custom-tooltip ms-2'>
                                                    <img className='tooltip-img' data-tooltip-id="curb-to-tooltip" src={Images?.ExclamationMark} alt="" />
                                                    <ReactTooltip
                                                        id="curb-to-tooltip"
                                                        place="bottom"
                                                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ."
                                                        style={{maxWidth: '500px'}}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='ride-type-price'>
                                            <div className='single'>
                                                <div className='row align-items-center'>
                                                    <div className='col-3'>
                                                        <img className='type-img' src={Images?.RideTypeImg1} alt="" />
                                                    </div>
                                                    <div className='col-9 rght ps-0'>
                                                        <div className='d-flex align-items-center'>
                                                            <span className='ttl'>Dais WA Assist</span> 
                                                            <div className='custom-tooltip ms-3'>
                                                                <img className='tooltip-img' data-tooltip-id="ride-tooltip-1" src={Images?.ExclamationMark} alt="" />
                                                                <ReactTooltip
                                                                    id="ride-tooltip-1"
                                                                    place="bottom"
                                                                    content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ."
                                                                    style={{maxWidth: '500px'}}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='price-area'>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="mini-van-1"/>
                                                                <label htmlFor="mini-van-1">Mini Van <span className='price'>$2.99</span></label>
                                                            </div>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="full-van-1"/>
                                                                <label htmlFor="full-van-1">Full Size<span className='price'>$3.99</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='single active'>
                                                <div className='row align-items-center'>
                                                    <div className='col-3'>
                                                        <img className='type-img' src={Images?.RideTypeImg2} alt="" />
                                                    </div>
                                                    <div className='col-9 rght ps-0'>
                                                        <div className='d-flex align-items-center'>
                                                            <span className='ttl'>Dais WA Assist</span> 
                                                            <div className='custom-tooltip ms-3'>
                                                                <img className='tooltip-img' data-tooltip-id="ride-tooltip-2" src={Images?.ExclamationMark} alt="" />
                                                                <ReactTooltip
                                                                    id="ride-tooltip-2"
                                                                    place="bottom"
                                                                    content="Lorem  sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ."
                                                                    style={{maxWidth: '500px'}}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='price-area'>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="mini-van-2"/>
                                                                <label htmlFor="mini-van-2">Mini Van <span className='price'>$2.99</span></label>
                                                            </div>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="full-van-2"/>
                                                                <label htmlFor="full-van-2">Full Size<span className='price'>$3.99</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='single'>
                                                <div className='row align-items-center'>
                                                    <div className='col-3'>
                                                        <img className='type-img' src={Images?.RideTypeImg3} alt="" />
                                                    </div>
                                                    <div className='col-9 rght ps-0'>
                                                        <div className='d-flex align-items-center'>
                                                            <span className='ttl'>Dais WA Assist</span> 
                                                            <div className='custom-tooltip ms-3'>
                                                                <img className='tooltip-img' data-tooltip-id="ride-tooltip-3" src={Images?.ExclamationMark} alt="" />
                                                                <ReactTooltip
                                                                    id="ride-tooltip-3"
                                                                    place="bottom"
                                                                    content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ."
                                                                    style={{maxWidth: '500px'}}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='price-area'>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="mini-van-3"/>
                                                                <label htmlFor="mini-van-3">Mini Van <span className='price'>$2.99</span></label>
                                                            </div>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="full-van-3"/>
                                                                <label htmlFor="full-van-3">Full Size<span className='price'>$3.99</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='single'>
                                                <div className='row align-items-center'>
                                                    <div className='col-3'>
                                                        <img className='type-img' src={Images?.RideTypeImg4} alt="" />
                                                    </div>
                                                    <div className='col-9 rght ps-0'>
                                                        <div className='d-flex align-items-center'>
                                                            <span className='ttl'>Dais WA Assist</span> 
                                                            <div className='custom-tooltip ms-3'>
                                                                <img className='tooltip-img' data-tooltip-id="ride-tooltip-4" src={Images?.ExclamationMark} alt="" />
                                                                <ReactTooltip
                                                                    id="ride-tooltip-4"
                                                                    place="bottom"
                                                                    content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ."
                                                                    style={{maxWidth: '500px'}}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='price-area'>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="mini-van-4"/>
                                                                <label htmlFor="mini-van-4">Mini Van <span className='price'>$2.99</span></label>
                                                            </div>
                                                            <div className='price-single'>
                                                                <input type="radio" name='ride-radio-1' id="full-van-4"/>
                                                                <label htmlFor="full-van-4">Full Size<span className='price'>$3.99</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='tip-area'>
                                            <h6 className='top-head'>Say thanks with a tip</h6>
                                            <p>Without our amazing drivers, there is no Dais. Please show them some love <span style={{color: "#960000"}}>❤</span> with a tip</p>
                                            <div className='tip-options'>
                                                <div className='tip-point active'>10%</div>
                                                <div className='tip-point'><label className='mt-1'>15%</label> <span>Most Tipped</span></div>
                                                <div className='tip-point'>20%</div>
                                                <div className='tip-point'>Other</div>
                                            </div>
                                        </div>

                                        <div className='ride-type-foot'>
                                            <div className='foot-row'>
                                                <div className='btn-grp'>
                                                    <button className='foot-btn text-start' data-bs-toggle="modal" data-bs-target="#couponsModal"><i className='icon-coupon'></i>1 Coupon</button>
                                                    <button className='foot-btn' data-bs-toggle="modal" data-bs-target="#paymentMethodModal"><i className='icon-wallet-2'></i>Cards</button>
                                                    <button className='foot-btn text-end' data-bs-toggle="modal" data-bs-target="#someoneRideModal"><i className='icon-profile'></i>My Self</button>
                                                </div>
                                                <button className='com-btn'>Schedule Ride</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-5 ps-0'>
                                    <iframe className='ride-type-map w-100 h-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24136.011146735913!2d-102.79806686723452!3d40.871843624363656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1713433405553!5m2!1sen!2sin"/> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        {/* Coupons  modal */}
        <div className="modal fade com-modal coupans-modal" id="couponsModal" tabIndex={-1} aria-labelledby="couponsModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                    <h1 className="modal-title" id="couponsModalLabel">Coupons </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="icon-close-circle"></i></button>
                    </div>
                    <div className="modal-body">

                        <div className='button-input'>
                            <input className='com-input' type="text" />
                            <button className='com-btn golden-bg text-white'>Apply</button>
                        </div>

                        <div className='coupans-wrap'>
                            <div className='coupan-single'>
                                <div className='code-row'>
                                    <span className='code'>GIAS50</span>
                                    <i className='icon-user copy-code'></i>
                                </div>
                                <p className='coupan-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere neque ex, non dapibus lacus elementum quis.</p>
                            </div>

                            <div className='coupan-single'>
                                <div className='code-row'>
                                    <span className='code'>GIAS50</span>
                                    <i className='icon-user copy-code'></i>
                                </div>
                                <p className='coupan-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere neque ex, non dapibus lacus elementum quis.</p>
                            </div>

                            <div className='coupan-single'>
                                <div className='code-row'>
                                    <span className='code'>GIAS50</span>
                                    <i className='icon-user copy-code'></i>
                                </div>
                                <p className='coupan-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere neque ex, non dapibus lacus elementum quis.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        {/* Payment Method modal*/}
        <div className="modal fade com-modal payment-method-modal" id="paymentMethodModal" tabIndex={-1} aria-labelledby="paymentMethodModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                    <h1 className="modal-title" id="paymentMethodModalLabel">Payment Method</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="icon-close-circle"></i></button>
                    </div>
                    <div className="modal-body">

                        <div className='ttl-amouont'>
                            <div>Total Amount</div>
                            <div>$20.00</div>
                        </div>

                        <div className='inner-div'>
                            <h5 className='modal-inner-heading'>Dais Wallet</h5>
                            <div className='add-money-card'>
                                <div className=''>
                                    <div className='price'>$150.00</div>
                                    <span className='label'>Total Amount</span>
                                </div>
                                <button className='add-btn'>Add Money</button>
                            </div>
                            <button className='add-card-btn'>Add Card <i className='icon-chev-right'></i></button>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        {/* Someone else taking this ride modal*/}
        <div className="modal fade com-modal" id="someoneRideModal" tabIndex={-1} aria-labelledby="someoneRideModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="someoneRideModalLabel">Someone else taking this ride?</h1>
                    <p className='mb-0'>Choose a contact so that they also get driver number vehicle details and ride OTP via SMS.</p>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="icon-close-circle"></i></button>
                    </div>
                    <div className="modal-body pt-4">
                        
                        <div className="form-check com-radio mb-4">
                            <input className="form-check-input" type="radio" id="meChoose" name='someoneRideRadio' />
                            <label className="form-check-label golden-text" htmlFor="meChoose"> <i className='icon-user-2 ms-1 me-2'></i> Me</label>
                        </div>
                        <div className="form-check com-radio mb-4">
                            <input className="form-check-input" type="radio" id="meChoose2" name='someoneRideRadio'/>
                            <label className="form-check-label golden-text" htmlFor="meChoose2"> <i className='icon-user-2 ms-1 me-2'></i> Enter other person name</label>
                        </div>
                        <div className="com-floating mb-0">
                            <i className="f-icon icon-user-2"></i>
                            <label className="f-label">Name</label>
                            <input className="f-input" type="text" placeholder="Enter name" />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <div className='row w-100'>
                            <div className='col-5'>
                                <button type="button" className="com-btn com-btn-outline w-100" data-bs-dismiss="modal">Skip</button>
                            </div>
                            <div className='col-7'>
                                <button type="button" className="com-btn w-100" data-bs-dismiss="modal">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


      
   </main>
  )
}

export default RideType