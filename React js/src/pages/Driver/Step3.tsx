import React, { useState } from 'react'
import DatePicker from 'react-datepicker';



const Step3 = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

  return (
    <div className='driver-card'>
      <div className='row'>
        <div className='col-md-12'>
            <label className='form-heading'>Are you PASS (Passenger Assistance, Safety and Sensitivity) certified?</label>
            <div className='d-flex gap-5'>
              <div className="form-check com-radio">
                  <input className="form-check-input" type="radio" id="areYouPass1" name="areYouPass"/>
                  <label className="form-check-label golden-text" htmlFor="areYouPass1">Yes</label>
              </div>
              <div className="form-check com-radio">
                  <input className="form-check-input" type="radio" id="areYouPass2" name="areYouPass"/>
                  <label className="form-check-label golden-text" htmlFor="areYouPass2">No</label>
              </div>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='upload-ui'>
            <input type="file"  className='d-none' id='front-1'/>
            <label htmlFor="front-1">
              <i className='icon-upload'></i>
              <span>Upload the certificate</span>
            </label>
          </div>
        </div>
        <div className='col-md-6'>
            <div className="com-floating date-filed">
                <i className="f-icon icon-calendar"></i>
                <label className="f-label">Expiration Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className='f-input'
                    placeholderText="Select Date"
                />
            </div>
        </div>

        <div className="do-not-worry-box">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>
                Do not worry, Dais will provide training at no cost for you.
                Please click on the link below to start Pass certification
                training online.
              </p>
            </div>
            <div className="col-md-6">
              <button className="com-btn com-btn-outline w-100">
                Start Pass Certification Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
            <label className='form-heading'>Are you certified in basic CPR/First Aid training?</label>
            <div className='d-flex gap-5'>
              <div className="form-check com-radio">
                  <input className="form-check-input" type="radio" id="areYoucertified1" name="areYoucertified"/>
                  <label className="form-check-label golden-text" htmlFor="areYoucertified1">Yes</label>
              </div>
              <div className="form-check com-radio">
                  <input className="form-check-input" type="radio" id="areYoucertified2" name="areYoucertified"/>
                  <label className="form-check-label golden-text" htmlFor="areYoucertified2">No</label>
              </div>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='upload-ui'>
            <input type="file"  className='d-none' id='front-1'/>
            <label htmlFor="front-1">
              <i className='icon-upload'></i>
              <span>Upload the certificate</span>
            </label>
          </div>
        </div>
        <div className='col-md-6'>
            <div className="com-floating date-filed">
                <i className="f-icon icon-calendar"></i>
                <label className="f-label">Expiration Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className='f-input'
                    placeholderText="Select Date"
                />
            </div>
        </div>
        <div className="do-not-worry-box">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>
                Do not worry, Dais will provide training within the application
                at no cost for you. Please click on the link below to register &
                complete your CPR/First Aid training.
              </p>
            </div>
            <div className="col-md-6">
              <button className="com-btn com-btn-outline w-100">
                Start CPR/First Aid Training Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Step3