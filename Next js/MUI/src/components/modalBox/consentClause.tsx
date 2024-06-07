import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import htmlParse from "html-react-parser";
interface Iprops {
    handleModel?: Function;
    title?: string;
}

export default function ConsentClause(props: Iprops) {
    const [show, setShow] = useState(true);
    const router = useRouter();
    const { t } = useTranslation("modal");
    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));

    return (
        <Modal show={show} centered size="lg">
            <div className="modal-header btn_close_btn">
                <button
                    type="button"
                    className="btn_close_icon"
                    onClick={() => {
                        props?.handleModel(false);
                        setShow(false);
                    }}
                >
                    <i className="icon-cross ti-md"></i>
                </button>
            </div>
            <div className="modal-body text-center">
                <h4 className="text-black">{t("data_consent_clause")}</h4>
                <p className="text-black text-start">
                    <strong>{t("please_read_this_consent_clause")}</strong>
                </p>
                <p className="text-black text-start">
                    {htmlParse(t("purpose_of_data_collection"))}
                </p>

                <p className="text-black text-start">
                    {htmlParse(t("data_usage_and_disclosure"))}
                </p>
                <p className="text-black text-start">
                    {htmlParse(t("data_security_access"))}
                </p>
                <p className="text-black text-start my-5">
                    {t("submitting_your_application")}
                </p>
            </div>
        </Modal>
    );
}
