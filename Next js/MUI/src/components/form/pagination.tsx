import React from "react";
interface Iprops {
    handlePagination?: Function;
    numberOfRec?: number;
    totalRec?: number;
}

function Pagination(props: Iprops) {
    return (
        <>
            <div className="tab-pagination d-flex justify-content-between align-items-center mt-4">
                {/* <p className="align-items-start">
                    1-{props?.numberOfRec ?? 1} {t("of")}{" "}
                    {props?.totalRec ?? 200} {t("list")}
                </p> */}
                <div className="d-flex align-items-end">
                    <button
                        className="btn btn-sm btn-blue"
                        onClick={() => props?.handlePagination(false)}
                    >
                        <span className="btn_icon">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/left-wt-arrow.png`}
                                alt=""
                            />
                        </span>
                        {/* {t("previous")} */}
                    </button>
                    <button
                        className="btn btn-sm btn-fill"
                        onClick={() => props?.handlePagination(true)}
                    >
                        {/* {t("next")} */}
                        <span className="btn_icon">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/right-arrow.png`}
                                alt=""
                            />
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}
export default Pagination;
