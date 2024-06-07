import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Iprops {
    handleModel?: Function;
}

export default function AddComment(props: Iprops) {
    const { t } = useTranslation("modal");
    const [show, setShow] = useState(true);
    const [data, setData] = useState("");
    const router = useRouter();

    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));

    const handleClose = () => {
        props.handleModel();
        setShow(false);
    };

    return (
        <Modal show={show} centered>
            <div className="modal-header btn_close_btn">
                <h2>{t("add_comment")}</h2>
            </div>
            <div className="modal-body">
                <form action="">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-0 form_box">
                                <textarea
                                    rows={4}
                                    placeholder={t("write_comment_placeholder")}
                                    className="form-control"
                                    id="bs-validation-name"
                                    required
                                    onChange={(e) => {
                                        setData(e.target.value);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="modal-footer justify-content-center mt-3">
                <button
                    type="button"
                    className="btn btn-white"
                    onClick={handleClose}
                >
                    {t("cancel")}
                </button>
                <button
                    className="btn btn-fill"
                    onClick={() => {
                        props?.handleModel(data);
                    }}
                >
                    {" "}
                    {t("save")}
                </button>
            </div>
        </Modal>
    );
}
