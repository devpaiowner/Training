import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Iprops {
    handleModel?: Function;
    title?: string;
}

export default function CreatePaymentModal(props: Iprops) {
    const [show, setShow] = useState(true);
    const router = useRouter();

    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));
    const { t } = useTranslation("modal");
    return (
        <Modal show={show} centered>
                <div className="modal-body text-center p-4">
                    <div className="p_img mb-3">
                        <span className="icon-question-mark">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                        </span>
                        
                    </div>
                    <p className="text-dblue fw-semibold">{props?.title}</p>
                        <button
                            type="button"
                            onClick={() => {
                                props?.handleModel(false);
                            }}
                            className="btn btn-white"
                        >
                            {t("no")}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                props?.handleModel(true);
                            }}
                            className="ms-3 btn btn-fill"
                        >
                            {t("yes")}
                        </button>
                </div>
        </Modal>
    );
}
