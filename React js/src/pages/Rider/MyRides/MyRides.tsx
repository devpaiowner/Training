import React, { useEffect, useState } from 'react'
import { Images } from '../../../constants/ImageConstants';


const MyRides = () => {

    
  


    return (
        <main className="main-content top-gap">
            <div className='container-fluid my-rides-page'>
                <div className='my-rides-row'>
                    <div className='lft'>

                        <ul className="nav nav-tabs com-nav-tabs" id="my-rideTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pastRide-tab" data-bs-toggle="tab" data-bs-target="#pastRide" type="button" role="tab" aria-controls="pastRide" aria-selected="true">Past Rides</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab" aria-controls="upcoming" aria-selected="false">Upcoming Rides</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="my-rideTabContent">
                            <div className="tab-pane fade show active" id="pastRide" role="tabpanel" aria-labelledby="pastRide-tab">
                                <div className='ride-card'>
                                    <div className='upper-part'>
                                        <div className='time-price'>
                                            <span className='time'>Thu, Nov 02, 01:27 PM</span>
                                            <span className='price'>$20.00</span>
                                        </div>
                                        <div className='status-tab ongoing'>Ongoing</div>
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
                                </div>
                                <div className='ride-card'>
                                    <div className='upper-part'>
                                        <div className='time-price'>
                                            <span className='time'>Thu, Nov 02, 01:27 PM</span>
                                            <span className='price'>$20.00</span>
                                        </div>
                                        <div className='status-tab cancelled'>Cancelled</div>
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
                                </div>
                                <div className='ride-card'>
                                    <div className='upper-part'>
                                        <div className='time-price'>
                                            <span className='time'>Thu, Nov 02, 01:27 PM</span>
                                            <span className='price'>$20.00</span>
                                        </div>
                                        <div className='status-tab completed'>Completed</div>
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
                                </div>
                            </div>
                            <div className="tab-pane fade" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
                                <div className='ride-card'>
                                    <div className='upper-part'>
                                        <div className='time-price'>
                                            <span className='time'>Thu, Nov 02, 01:27 PM</span>
                                            <span className='price'>$20.00</span>
                                        </div>
                                        <div className='status-tab ongoing'>Ongoing</div>
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
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='my-rides-detail'>
                        <div className='top-time'>Thu, Nov 02, 01:27 PM</div>
                        <div className='my-rides-map'>
                            <div className='status-tab completed'>Completed</div>
                            <iframe className='inner-map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24136.011146735913!2d-102.79806686723452!3d40.871843624363656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1713433405553!5m2!1sen!2sin"/> 
                        </div>

                        <div className='distance-row'>
                            <div className='distance-loaction'>
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
                            </div>
                            <div className='miles-count'>
                                <div className='miles-single'>
                                    <div className='large-txt'>2 Miles </div>
                                    <div className='small-txt'>Distance</div>
                                </div>
                                <div className='miles-single'>
                                    <div className='large-txt'>3.0 Min</div>
                                    <div className='small-txt'>Duration</div>
                                </div>
                            </div>
                        </div>

                        <div className='service-type-row'>
                            <div className='s-lft'>
                                <div className='service-type-title'>
                                    Service Type
                                    <div className='service-type-btns'>
                                        <button className='down-msg-btn'><img src={Images?.DownloadImgIcon} /></button>
                                        <button className='down-msg-btn'><img src={Images?.MsgImgIcon} /></button>
                                    </div>
                                </div>
                                <table className='service-type-table'>
                                    <tbody>
                                        <tr>
                                            <td><div className='d-flex'> Date of Ride <span className='ms-auto ps-2'>:</span></div></td>
                                            <td>Nov 02, 2023, 01:27 PM</td>
                                        </tr>
                                        <tr>
                                            <td><div className='d-flex'>Ride ID <span className='ms-auto ps-2'>:</span></div></td>
                                            <td>05448040465</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <table className='service-amount-table'>
                                <tbody>
                                    <tr>
                                        <td>Rider Payment</td>
                                        <td>$118.78</td>
                                    </tr>
                                    <tr>
                                        <td>Tip</td>
                                        <td>$3.00</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Total </td>
                                        <td>$121.78</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className='get-help-row'>
                            <button className='get-help-btn' data-bs-toggle="modal" data-bs-target="#supportModal">
                                <img className='btn-ui' src={Images?.GetHelpImg} alt=""/>
                                <span className='txt'>Get Help</span>
                                <i className='icon-chev-right'></i>
                            </button>
                            <button className='com-btn write-r-btn' data-bs-toggle="modal" data-bs-target="#ratingReviewModal">Write a Review</button>
                        </div>

                        <div className='review-shown'>
                            <div className='rating flex-wrap'>
                                Your rating for rider 
                                <div>
                                    <i className='icon-star'></i>
                                    <i className='icon-star'></i>
                                    <i className='icon-star'></i>
                                    <i className='icon-star-outline'></i>
                                    <i className='icon-star-outline'></i>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et.</p>
                        </div>
                    </div>
                </div>
            </div>




            {/* get help modal  */}
            <div className="modal fade com-modal" id="supportModal" tabIndex={-1} aria-labelledby="supportModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title" id="supportModalLabel">Support</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="icon-close-circle"></i></button>
                        </div>
                        <div className="modal-body pt-4">
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="" />
                                <label className="form-check-label golden-text" htmlFor="">I was involved in a accident</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="" />
                                <label className="form-check-label golden-text" htmlFor="">Review my fare of fee.</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="" />
                                <label className="form-check-label golden-text" htmlFor="">I lost an item</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="" />
                                <label className="form-check-label golden-text" htmlFor="">I want to report issue about the captain.</label>
                            </div>
                            <div className="form-check com-radio mb-4">
                                <input className="form-check-input" type="radio" id="" />
                                <label className="form-check-label golden-text" htmlFor="">Other</label>
                            </div>

                            <textarea className='com-input h-auto resize-none mb-0' rows={4} placeholder='Write your reason'></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="com-btn gray-btn w-100" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* rating modal */}
            <div className="modal fade com-modal rating-review-modal" id="ratingReviewModal" tabIndex={-1} aria-labelledby="ratingReviewModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title" id="ratingReviewModalLabel">Rating & Reviews</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="icon-close-circle"></i></button>
                        </div>
                        <div className="modal-body pt-4">
                            <div className='text-center'>
                                <img className='review-pic' src={Images?.UserImg2} alt="user img" />
                                <h5 className='user-name'>Roan Roads</h5>
                                <div className='stars'>
                                    <img src={Images?.Star} alt="" />
                                    <img src={Images?.Star} alt="" />
                                    <img src={Images?.Star} alt="" />
                                    <img src={Images?.StarOutline} alt="" />
                                    <img src={Images?.StarOutline} alt="" />
                                </div>
                            </div>

                            <textarea className='com-input h-auto resize-none' rows={4} placeholder='Write your reason'></textarea>
                        </div>
                        <div className="modal-footer mt-0">
                            <button type="button" className="com-btn w-100 m-0" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default MyRides;