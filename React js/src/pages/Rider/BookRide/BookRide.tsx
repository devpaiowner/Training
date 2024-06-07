import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../../constants/ImageConstants'
import MsgDriver from './MsgDriver'
import DatePicker from 'react-datepicker';


const BookRide = () => {



    return (
        <main className="main-content top-gap">

            <div className='container-fluid'>

                <div className='get-ride-layout'>
                    <div className='row gy-4'>
                        <div className='col-md-6 col-lg-4 col-xl-4 col-xxl-3'>
                            <div className='get-a-ride'>
                                <h1 className='com-heading-2 text-white mb-3'>Get a Ride</h1>
                                <div className="icon-input mb-3 location-search">
                                    <i className="icon-pickup grren-text"></i>
                                    <input className="com-input" type="text" placeholder="Pickup" />
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
                                    <input className="com-input" type="text" placeholder="Destination" />
                                    <div className='location-right-btns'>
                                        <button className='search-inner-btn'>
                                            <i className="icon-close-circle"></i>
                                        </button>
                                    </div>
                                    <ul className='location-dropdwon d-none'>
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


                            <div className='schedule-ride-box'>
                                <div className='head'>
                                    <Link className='back-btn' to=""><i className='icon-chev-right'></i></Link>
                                    <div className='clear-btn'>Clear</div>
                                </div>

                                <h2 className='com-heading-2'>Schedule Ride?</h2>
                                <p>From New York</p>

                                <ul className="nav nav-tabs com-nav-tabs" id="schedule-ride" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pickyp-tab" data-bs-toggle="tab" data-bs-target="#pickyp" type="button" role="tab" aria-controls="pickyp" aria-selected="true">Pickup at</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="dropoff-tab" data-bs-toggle="tab" data-bs-target="#dropoff" type="button" role="tab" aria-controls="dropoff" aria-selected="false">Dropoff by</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="schedule-rideContent">
                                    <div className="tab-pane fade show active" id="pickyp" role="tabpanel" aria-labelledby="pickyp-tab">

                                        <div className="com-floating date-filed">
                                            <i className="f-icon icon-calendar"></i>
                                            <DatePicker
                                                onChange={() => { }}
                                                dateFormat="dd/MM/yyyy"
                                                className='f-input f-pass-input'
                                                placeholderText="Select Date"
                                                withPortal
                                                portalId="root-portal"
                                                showTimeSelect
                                            />
                                            <i className="f-pass icon-chev-btm" style={{ fontSize: '5px' }}></i>
                                        </div>
                                        <div className="com-floating date-filed">
                                            <i className="f-icon icon-clock"></i>
                                            <DatePicker
                                                onChange={() => { }}
                                                dateFormat="dd/MM/yyyy"
                                                className='f-input f-pass-input'
                                                placeholderText="Select Time"
                                            />
                                            <i className="f-pass icon-chev-btm" style={{ fontSize: '5px' }}></i>
                                        </div>
                                        <ul className='pickup-list'>
                                            <li>Choose your exact pickup time up to 90 days in advance</li>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="dropoff" role="tabpanel" aria-labelledby="dropoff-tab">
                                        ddd
                                    </div>
                                </div>

                                <button className='com-btn w-100 mt-5'>Next</button>


                            </div>

                            <div className='searching-ride-box text-white'>
                                <h2 className='com-heading-2'>Searching for nearest professional driver</h2>
                                <div className='searching-range'>
                                    <div className='range-inner' style={{ width: "50%" }}></div>
                                </div>
                                <div className='van-animate'>
                                    <img className='van-img' src={Images?.VanImg} alt="" />
                                    <div className='circle-animation'>
                                        <div className="circle delay1"></div>
                                        <div className="circle delay2"></div>
                                        <div className="circle delay3"></div>
                                        <div className="circle delay4"></div>
                                    </div>
                                </div>
                                <div className='location-part'>
                                    <div className='location-txt start-location'>
                                        <span className='start-loc-icon'></span>
                                        20 Square, New York, NY 10003
                                    </div>
                                    <div className='location-txt end-location'>
                                        <img className='loc-icon-img' src={Images?.LocationIconRed} />
                                        22 Circle , New York, NY 10050
                                    </div>
                                </div>

                                <p className='searching-pickup'><span className='fw-500'>Pickup</span> : Mar 14, 12:50 PM</p>
                                <div className='searching-price'>$3.99 <br /> <span>Credit Card</span></div>
                                <button className='com-btn com-btn-outline w-100 mt-4' data-bs-toggle="modal" data-bs-target="#cancelRideModal">Cancel Ride</button>
                            </div>


                            <div className='meet-driver-box'>
                                <div className='meet-at-row'>
                                    <div className='meet-at-left'>
                                        <h2 className='com-heading-2'>Meet at your pickup spot</h2>
                                        <p>Driver is on the way</p>
                                    </div>
                                    <div className='arrive-time'>3  <br />min</div>
                                </div>

                                <div className='code-pin'>
                                    <span>Code Pin</span>
                                    <div className='code-pin-num'>
                                        <span className='num-single'>3</span>
                                        <span className='num-single'>3</span>
                                        <span className='num-single'>5</span>
                                        <span className='num-single'>0</span>
                                    </div>
                                </div>

                                <div className='taxi-info'>
                                    <div className='taxi-info-left'>
                                        <div className='driver-img'>
                                            <img src={Images?.UserImg2} alt="" />
                                            <div className='driver-rating'><i className='icon-star'></i>4.0</div>
                                        </div>
                                        <img className='car-img' src={Images?.CarImg} alt="" />
                                    </div>
                                    <div className='taxi-info-rght'>
                                        <div className='name'>Roan Roads</div>
                                        <div className='num'>3M53ABF2</div>
                                        <div className='taxi-name'>Robo Texi</div>
                                    </div>
                                </div>

                                <div className='talking-option'>
                                    <button className='msg-btn'><i className='icon-message me-2'></i>Message</button>
                                    <button className='call-btn'><i className='icon-call me-2'></i>Call</button>
                                </div>
                                <div className='on-the-way'>On the way</div>

                                <div className='location-part'>
                                    <div className='location-txt start-location'>
                                        <span className='start-loc-icon'></span>
                                        20 Square, New York, NY 10003
                                    </div>
                                    <div className='location-txt end-location'>
                                        <img className='loc-icon-img' src={Images?.LocationIconRed} />
                                        22 Circle , New York, NY 10050
                                    </div>
                                </div>
                                <div className='credit-rate mt-3'>
                                    $3.99 <br /> <span>Credit Card</span>
                                </div>
                                <button className='com-btn com-btn-outline w-100 mt-4' data-bs-toggle="modal" data-bs-target="#cancelRideModal">Cancel Ride</button>
                            </div>
                        </div>
                        <div className='col-12 col-lg-8 col-xl-8 col-xxl-9'>
                            <div className='ride-map-area'>
                                <iframe className='w-100 h-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24136.011146735913!2d-102.79806686723452!3d40.871843624363656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1713433405553!5m2!1sen!2sin" />
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            <div className="modal fade com-modal" id="cancelRideModal" tabIndex={-1} aria-labelledby="cancelRideModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="cancelRideModalLabel">Cancel Ride?</h1>
                            <p className='mb-0'>Select your Cancellation Reason</p>
                        </div>
                        <div className="modal-body pt-3">
                            <p className='green-text mb-4 extra-txt'>User will be charged $20.00 </p>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="cancel-ride-1" name="cancel-ride-radio" />
                                <label className="form-check-label golden-text" htmlFor="cancel-ride-1">Driver not moving or responding to call/chat</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="cancel-ride-2" name="cancel-ride-radio" />
                                <label className="form-check-label golden-text" htmlFor="cancel-ride-2">Got a faster ride</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="cancel-ride-3" name="cancel-ride-radio" />
                                <label className="form-check-label golden-text" htmlFor="cancel-ride-3">No longer need ride</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="cancel-ride-4" name="cancel-ride-radio" />
                                <label className="form-check-label golden-text" htmlFor="cancel-ride-4">Taking longer than expected</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="cancel-ride-5" name="cancel-ride-radio" />
                                <label className="form-check-label golden-text" htmlFor="cancel-ride-5">Driver refused to assist as requested</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="cancel-ride-6" name="cancel-ride-radio" />
                                <label className="form-check-label golden-text" htmlFor="cancel-ride-6">Incorrect vehicle and/or ride type arrived at pickup </label>
                            </div>

                            <textarea className='com-input h-auto resize-none mb-0' rows={4} placeholder='Write your reason'></textarea>
                        </div>
                        <div className="modal-footer mt-3">
                            <div className='row w-100'>
                                <div className='col-5 ps-0'>
                                    <button type="button" className="com-btn com-btn-outline w-100" data-bs-dismiss="modal">No</button>
                                </div>
                                <div className='col-7 pe-0'>
                                    <button type="button" className="com-btn w-100" data-bs-dismiss="modal">Yes, Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        {/* <MsgDriver/> */}

   </main>

    )
}

export default BookRide