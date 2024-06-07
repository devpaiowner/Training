import React, { Fragment, useContext } from "react";
import moment from "moment";
import useStore, { IStore } from "@/common/zustand/store";

import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { IMG_PATH } from "@/common/utils/constant";

export default function PersonalDetails() {
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );

  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  return (
    <Fragment>
      <div className="col-xl-4 col-lg-5 col-md-5">
        <div className="card mb-4">
          <div className="user_details_sec card-body">
            <div className="profile_img">
              <img
                src={
                  storeData?.["avatar"]
                    ? `${IMG_PATH}${storeData?.["avatar"]}`
                    : `${process.env.NEXT_PUBLIC_BASEPATH}/images/profile.png`
                }
                alt=""
              />
              <h4 className="user_name">
                {storeData?.myProfile?.first_name +
                  " " +
                  storeData?.myProfile?.last_name}
              </h4>
            </div>
          </div>
          <hr />
          <div className="card-body user_information">
            <small className="card-text text-uppercase">USER PROFILE</small>

            <ul className="list-unstyled mb-4 mt-3">
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Name:</span>
                <span>
                  {storeData?.myProfile?.first_name +
                    " " +
                    storeData?.myProfile?.last_name}
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Business Email:</span>
                <span>{storeData?.myProfile?.email}</span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Nationality:</span>
                <span>{storeData?.myProfile?.nationality}</span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Mobile Number:</span>
                <span>
                  {storeData?.myProfile?.country_code +
                    "-" +
                    storeData?.myProfile?.mobile}
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Date Of Birth:</span>
                <span>
                  {moment(storeData?.myProfile?.dob).format("DD MMM YYYY")}
                </span>
              </li>
            </ul>

            <hr />
            <small className="card-text text-uppercase">Business Details</small>
            <ul className="list-unstyled mb-4 mt-3">
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Business Name:</span>
                <span>{storeData?.myProfile?.business?.name}</span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Business Sector:</span>
                <span>
                  {storeData?.myProfile?.business &&
                    storeData?.myProfile?.business?.sector?.name}
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Business Address:</span>
                <span>
                  {storeData?.myProfile?.business &&
                    storeData?.myProfile?.business?.address?.properties?.street}
                </span>
              </li>

              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Tin:</span>
                <span>{storeData?.myProfile?.business?.tin}</span>
              </li>

              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Director Name:</span>
                <span>
                  {
                    storeData?.myProfile?.business?.director_profiles_data[0]
                      ?.full_name
                  }
                </span>
              </li>

              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">Director NIDA ID:</span>
                <span>
                  {
                    storeData?.myProfile?.business?.director_profiles_data[0]
                      ?.nin
                  }
                </span>
              </li>

              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">
                  Authorized Representative Name:
                </span>
                <span>
                  {
                    storeData?.myProfile?.business
                      ?.authorized_representatives[0]?.full_name
                  }
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">
                  Authorized Representative Role:
                </span>
                <span>
                  {
                    storeData?.myProfile?.business
                      ?.authorized_representatives[0]?.role
                  }
                </span>
              </li>
              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">
                  Business Year of Incorporation:
                </span>
                <span>{storeData?.myProfile?.business?.registration_year}</span>
              </li>

              <li className="d-flex align-items-center">
                <span className="fw-bold mx-2 f_name">VRN:</span>
                <span>{storeData?.myProfile?.business?.vrn}</span>
              </li>
            </ul>
          </div>
        </div>

        <h6 className="card-text text-black text-uppercase">
          Uploaded Documents
        </h6>
        <div className="card mb-4 user_information">
          <div className="card-body">
            <ul className="list-unstyled mb-0">
              {storeData?.myProfile?.business?.documents &&
                storeData?.myProfile?.business?.documents.map(
                  (document, idx) => {
                    return (
                      <li
                        key={idx}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <span className="fw-bold mx-2 f_name">
                          {/* {documentTitle(
                                                                            document.type
                                                                        )} */}
                        </span>
                        <span
                        // onClick={() =>
                        //     showFileView(
                        //         document?.url,
                        //         document?.type
                        //     )
                        // }
                        >
                          <u
                            className="link-pointer"
                            style={{
                              color: "#08485C",
                            }}
                          >
                            View
                          </u>
                        </span>
                      </li>
                    );
                  }
                )}
            </ul>
            <div className="text-center mt-3 request_chnage_btn">
              <button
                // onClick={() => {
                //     handelInitaeChange(
                //         true
                //     );
                // }}
                // className="btn btn-blue"
                // className={`btn btn-blue ${
                //     ["approved"].includes(
                //         Cookie.get("isKyc")
                //     )
                //         ? ""
                //         : "disabled"
                // }`}
                data-bs-toggle="modal"
                data-bs-target="#kyc_update"
              >
                {" "}
                Initiate Change Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
