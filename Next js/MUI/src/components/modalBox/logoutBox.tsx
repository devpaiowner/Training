import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export function LogoutModalBox(
    modelToggle: boolean,
    imagePath: string,
    message: string,
    handelLogoutModal: Function
) {
    return (
        <Modal show={modelToggle} id="logout_modal" centered>
            
                <div className="modal-header btn_close_btn align-items-center">
                    <button
                        type="button"
                        className="btn_close_icon"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => handelLogoutModal(false)}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
                            alt=""
                        />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="p_img kyc_con">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}${imagePath}`}
                            style={{ width: "90px" }}
                            alt=""
                        />
                        <h4>{message}</h4>
                        <button
                            className="btn btn-fill"
                            onClick={() => handelLogoutModal(true)}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            
        </Modal>
    );
}
