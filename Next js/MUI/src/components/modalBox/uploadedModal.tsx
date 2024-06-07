/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
interface IProps {
    showModal: boolean;
    handleModal: any;
    src: string;
    name: string;
}
export function UploadedModal(props: IProps) {
    return (
        <Modal show={props.showModal} id="document_view" centered>
            <div className="modal-header btn_close_btn pt-5 align-items-center">
                <h5 className="mb-0 doc_head">{props?.name}</h5>
                <button
                    type="button"
                    className="btn_close_icon"
                    onClick={() => props.handleModal(false)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
                        alt=""
                    />
                </button>
            </div>
            <div className="modal-body">
                <div className="p_img mb-4">
                    {/* <embed
                        src={props.src}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    /> */}
                    <img src={props.src} className="w-100" alt="" />
                </div>
            </div>
        </Modal>
    );
}
