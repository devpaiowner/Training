import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Images } from "../../constants/ImageConstants";

const Step4 = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="driver-card">
        <div className="vehicle-inspection-area">
          <div className="vh-row">
            <img className="vh-img" src={Images?.VhImg} alt="" />
            <div className="rght">
              <h2 className="com-heading-2 mb-3">Vehicle Inspection</h2>
              <p>
                Your city requires an inspection to make sure your vehicle is in
                working order. After the inspection, submit the completed
                inspection form. Inspections completed for other ride sharing
                companies are accepted.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <button
                className="com-btn w-100"
                data-bs-toggle="modal"
                data-bs-target="#uploadInspectionModal"
              >
                I’ve completed my inspection
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="com-btn w-100"
                data-bs-toggle="modal"
                data-bs-target="#vehicleInspectionModal"
              >
                Find an inspection center
              </button>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <button className="com-btn com-btn-outline w-100 h-100">
                Complete your vehicle inspection virtually through our partner
              </button>
            </div>
            <div className="col-md-6">
              <button className="com-btn com-btn-outline w-100 h-100">
                Send vehicle inspection form to my email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload vehicle inspection modal */}
      <div
        className="modal fade com-modal upload-vh-inspection-modal"
        id="uploadInspectionModal"
        tabIndex={-1}
        aria-labelledby="uploadInspectionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title" id="uploadInspectionModalLabel">
                Upload vehicle inspection certificate
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-close-circle"></i>
              </button>
            </div>
            <div className="modal-body w-75 mx-auto">
              <div className="upload-area">
                <input type="file" className="d-none" id="vh-file" />
                <label htmlFor="vh-file">
                  <i className="icon-upload"></i>
                  <span>Upload the document</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="com-btn w-75 mx-auto"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Inspection modal */}
      <div
        className="modal fade com-modal upload-vh-inspection-modal"
        id="vehicleInspectionModal"
        tabIndex={-1}
        aria-labelledby="vehicleInspectionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title" id="vehicleInspectionModalLabel">
                Vehicle Inspection
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-close-circle"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>
                You can get an inspection at any Automotive Service Excellence
                (ASE) certified mechanic in your area, including those not on
                this list.
              </p>

              <h3 className="com-heading-2 mb-4">Independent Mechanics</h3>
              <button
                className="com-btn com-btn-outline send-btn"
                data-bs-toggle="modal"
                data-bs-target="#sendMailModal"
                data-bs-dismiss="modal"
              >
                Send vehicle inspection form to my email
              </button>

              <ul className="ase-service-list">
                <li className="single">
                  <img className="ase-img" src={Images?.AseImg} alt="" />
                  <div className="rght w-100">
                    <div className="d-flex">
                      <h5>ASE Service</h5>
                      <span className="small-txt ms-auto">2.1 Mi</span>
                    </div>
                    <p className="address">20 Square, New York, NY 10003</p>
                    <button className="fee-btn">
                      Fee Required - Call For Price{" "}
                      <i className="icon-chev-right ms-auto"></i>
                    </button>
                  </div>
                </li>
                <li className="single">
                  <img className="ase-img" src={Images?.AseImg} alt="" />
                  <div className="rght w-100">
                    <div className="d-flex">
                      <h5>ASE Service</h5>
                      <span className="small-txt ms-auto">2.1 Mi</span>
                    </div>
                    <p className="address">20 Square, New York, NY 10003</p>
                    <button className="fee-btn">
                      Fee Required - Call For Price{" "}
                      <i className="icon-chev-right ms-auto"></i>
                    </button>
                  </div>
                </li>
                <li className="single">
                  <img className="ase-img" src={Images?.AseImg} alt="" />
                  <div className="rght w-100">
                    <div className="d-flex">
                      <h5>ASE Service</h5>
                      <span className="small-txt ms-auto">2.1 Mi</span>
                    </div>
                    <p className="address">20 Square, New York, NY 10003</p>
                    <button className="fee-btn">
                      Fee Required - Call For Price{" "}
                      <i className="icon-chev-right ms-auto"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Send vehicle inspection form */}
      <div
        className="modal fade com-modal send-vehicle-inspection-modal"
        id="sendMailModal"
        tabIndex={-1}
        aria-labelledby="sendMailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body w-75 mx-auto text-center text-white">
              <img className="my-4" src={Images?.MailImg} alt="" />
              <h4 className="com-heading">Send vehicle inspection form</h4>
              <p>
                You will be emailed a vehicle inspection form that you will need
                to print out and bring to the mechanic.
              </p>
              <button
                className="com-btn w-75 mx-auto mb-4"
                data-bs-dismiss="modal"
              >
                Send
              </button>
              <button
                className="com-btn com-btn-outline w-75 mx-auto"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step4;
