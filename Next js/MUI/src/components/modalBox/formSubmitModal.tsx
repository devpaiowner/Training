import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import htmlParse from "html-react-parser";
interface Iprops {
    handleModel?: Function;
}

export default function FormSubmitModal(props: Iprops) {
    const [show, setShow] = useState(true);
    const { t } = useTranslation("modal");
    const handleClose = () => {
        props.handleModel(false);
        setShow(false);
    };
    return (
        <Modal show={show} centered>
            {/* <div className="modal-header btn_close_btn">
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
                </div> */}
            <div className="modal-body text-center">
                <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/check-mark.png`}
                    className="w-25"
                />

                <h4 className="text-dblue">
                    <em>{t("hurray")}</em>
                </h4>
                <p className="mb-0 text-dblue">
                   {htmlParse(t("thank_you_for_submitting_loan"))}
                </p>
            </div>
            <div className="modal-footer">
                <Link href="/dashboard" className="btn btn-fill w-100">
                    {t("back_to_dashboard")}
                </Link>
            </div>
        </Modal>
    );
}
