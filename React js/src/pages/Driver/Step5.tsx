import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Images } from '../../constants/ImageConstants'

const Step4 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
        <div className="driver-card">
                <div className="personal-info">
                    <div className="profile-img-area">
                        <div className="pro-img">
                            <div className="pro-img-inner">
                                <i className="icon-user-2"></i>
                                {/* <img src={Images?.UserImg} alt="user img" /> */}
                            </div>
                        </div>
                        <div className="img-btn">
                            <input className="d-none" id="choose-photo" type="file" />
                            <label htmlFor="choose-photo"><i className="icon-edit"></i> Add Photo</label>
                        </div>
                    </div>
                    <div className="com-floating">
                        <i className="f-icon icon-user-2"></i>
                        <label className="f-label">Name</label>
                        <input className="f-input" type="text" placeholder="Enter name"/>
                    </div>

                    <div className="com-floating date-filed">
                        <i className="f-icon icon-calendar"></i>
                        <label className="f-label">Expiration Date</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="MM/dd/yyyy"
                            className='f-input'
                            placeholderText="MM/DD/YYYY"
                        />
                    </div>

                    <button className="com-btn w-100 mt-3 mb-4" data-bs-toggle="modal" data-bs-target="#successSubmitModal">Submit</button>
                </div>
        </div>


        {/* Send vehicle inspection form */}
      <div
        className="modal fade com-modal success-submit-modal"
        id="successSubmitModal"
        tabIndex={-1}
        aria-labelledby="successSubmitModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body px-3 text-white text-center">
              <img className="mt-5 mb-4" src={Images?.SuccessMark} alt="" />
              <h4 className="com-heading">Successfully Submitted.</h4>
              <p>
              The profile is sent for review.
              </p>
              <button
                className="com-btn w-100 mb-4"
                data-bs-dismiss="modal"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step4;
