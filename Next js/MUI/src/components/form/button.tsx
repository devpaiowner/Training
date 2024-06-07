/* eslint-disable @next/next/no-img-element */
import React from "react";
import Spinner from "react-bootstrap/Spinner";

import useStore, { IStore } from "@/common/zustand/store";

export default function Button(props: {
    handleOnSubmit: Function;
    text: string;
    btnImage?: string;
    btnClass?: string;
}) {
    const { storeData } = useStore((state: IStore) => ({
        storeData: state.data,
    }));
    return (
        <>
            <button
                className={props?.btnClass ?? "btn btn-fill"}
                onClick={() => props.handleOnSubmit()}
                type="button"
                value={props?.text}
            >
                {props.text}
                {storeData.buttonLoading ? (
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                        />
                    </>
                ) : (
                    props?.btnImage && (
                        <span className="btn_icon">
                            <img
                                src={
                                    props?.btnImage ??
                                    `${process.env.NEXT_PUBLIC_BASEPATH}/images/right-arrow.png`
                                }
                                alt=""
                            />
                        </span>
                    )
                )}
            </button>
        </>
    );
}
