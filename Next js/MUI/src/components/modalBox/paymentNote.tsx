import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Iprops {
    handleModel?: Function;
    data?: any;
}

export default function PaymentNoteView(props: Iprops) {
    const [show, setShow] = useState(true);
    const router = useRouter();
    const { t } = useTranslation("modal");

    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));

    const handleClose = () => {
        props.handleModel("data");
        setShow(false);
    };

    return (
        <Modal show={show} centered>
                <div className="modal-header btn_close_btn">
                    <h2> {t("comment")}</h2>
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
                <div className="modal-body">
                    <form action="">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <p className="comment_des">{props?.data}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        </Modal>
    );
}
