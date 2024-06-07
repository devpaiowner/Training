/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Iprops {
  modalImage?: string;
  showModal?: boolean;
  handleShow?: Function;
  headFirst?: string;
  headSecond?: string;
  buttonName?: string;
  setModelImage?: string;
  handleModel?: Function;
}

export default function KycModal(props: Iprops) {
  const router = useRouter();
  const [kyc1, setKyc1] = useState(true);
  const [kyc2, setKyc2] = useState(false);
  const { t } = useTranslation("modal");
  const handleClose = () => {
    props.handleModel(false);
    setKyc1(false);
    router.push("/dashboard");
  };
  const handleNext = () => {
    setKyc1(false);
    setKyc2(true);
  };
  const handleNextClose = () => {
    props.handleModel(false);
    setKyc2(false);
    router.push("/dashboard");
  };
  return (
    <>
      <Modal show={kyc1} centered>
        <div className="modal-header btn_close_btn">
          <button
            type="button"
            className="btn_close_icon"
            onClick={handleClose}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
              alt=""
            />
          </button>
        </div>
        <div className="modal-body busines-cnt">
          <div className="p_img">
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/logoicon.svg`}
            />
            <h2 className="pop_up_text">{t("welcome_to_switch")}</h2>
            <h4>{t("your_switch_profile_setup_is_complete")}</h4>
          </div>
        </div>
        <div className="modal-footer justify-content-center">
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#add_step2"
            className="btn btn-fill"
            onClick={() => handleNext()}
          >
            {t("next")}
          </button>
        </div>
      </Modal>

      <Modal show={kyc2} centered>
        <div className="modal-header btn_close_btn">
          <button
            type="button"
            className="btn_close_icon"
            onClick={handleNextClose}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
              alt=""
            />
          </button>
        </div>
        <div className="modal-body busines-cnt">
          <div className="p_img">
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/credit.png`}
              alt=""
            />
            <h4>{t("first_step_towards")}</h4>
          </div>
        </div>
        <div className="modal-footer justify-content-center d-block text-center">
          <Link href="/dashboard" className="btn btn-fill">
            {t("apply_for_credit")}
          </Link>
          <br />
          {/* <Link href="dashboard.html">Skip</Link> */}
        </div>
      </Modal>
    </>
  );
}
