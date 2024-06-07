import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Iprops {
    handleModel?: Function;
    show?: boolean;
}

export default function SubmitModal(props: Iprops) {
    const router = useRouter();
    const { t } = useTranslation("modal");
    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));

    return (
        <Modal show={props?.show} centered>
            {/* <div className="modal-header btn_close_btn">
                <button
                    type="button"
                    className="btn_close_icon"
                    onClick={() => {
                        props.handleModel(false);
                    }}
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
                        alt=""
                    />
                </button>
            </div> */}
            <div className="modal-body text-center">
                <h4 className="text-black">{t("ready_to_submit")}</h4>
                <p className="mb-0 text-black">{t("information_accurately")}</p>
            </div>
            <div className="modal-footer d-flex justify-content-center mt-3">
                <button
                    onClick={() => {
                        props.handleModel(false);
                    }}
                    className="btn btn-white wd-40"
                >
                    {t("no")}
                </button>
                <br />
                <button
                    onClick={() => {
                        props.handleModel(true);
                    }}
                    className="btn btn-fill wd-40"
                >
                    {t("yes")}
                </button>
            </div>
        </Modal>
    );
}
