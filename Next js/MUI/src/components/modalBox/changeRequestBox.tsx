/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SurveyComponent from "../BusinessKycLayout/SurveyComponent";
import { useTranslation } from "react-i18next";

export default function ChangeRequestBox(
  modelToggle: boolean,
  handelInitaeChange: Function
) {
  const [request, setRequest] = useState<boolean>();
  const handeleRequest = (value: boolean) => {
    handelInitaeChange(false);
    setRequest(value);
  };
  const { t } = useTranslation("modal");
  return (
    <>
      <Modal show={modelToggle} centered>
        <div className="modal-header btn_close_btn align-items-center">
          <button
            type="button"
            className="btn_close_icon"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => handelInitaeChange(false)}
          >
            {" "}
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
              alt=""
            />
          </button>
        </div>
        <div className="modal-body  ">
          <div className="p_img kyc_con pb-5">
            <h4>
              {t("if_you_are_a_registered")}
              <a href="#" style={{ color: "#FFBC00" }}>
                {" "}
                {t("switch")}{" "}
              </a>{" "}
              {t("customer_and_need_to_edit")}
              {/* If you are a registered{" "}
                            <a href="#" style={{ color: "#FFBC00" }}>
                                {" "}
                                form here Switch{" "}
                            </a>{" "}
                            customer and need to Edit, Add, or Update your
                            Personal and Business Information, Please fill out
                            below form. */}
            </h4>
            <a
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#kyc_approval"
              className="btn btn-fill mt-3"
              onClick={() => handeleRequest(true)}
            >
              {" "}
              {t("change_request_form")}
            </a>
          </div>
        </div>
      </Modal>
      <Modal show={request} centered size="lg">
        <div className="modal-header btn_close_btn align-items-center">
          <button
            type="button"
            className="btn_close_icon"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => handeleRequest(false)}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
              alt=""
            />
          </button>
        </div>
        <div className="modal-body  ">
          <SurveyComponent />
          {/* <div className="p_img kyc_con mb-3 mb-2 ">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/kyc_approval.png`}
                            alt=""
                        />
                        <h4>
                            Thank you for initiating a change request, our team
                            will contact you shortly!
                        </h4>
                    </div> */}
        </div>
      </Modal>
    </>
  );
}
