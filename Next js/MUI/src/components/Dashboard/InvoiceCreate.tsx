import React, { useEffect, useState } from "react";
export default function InvoiceCreate() {
    const [menulist, setmenulist] = useState(false);
    const manageTogglehandleClick = () => {
        setmenulist(!menulist);
    };
    return (
        <div className="invoice-create  white-card p-4">
            <div className="d-flex justify-content-end align-items-center mb-2 position-relative">
                <img onClick={() => manageTogglehandleClick()}
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dark-horizontalmenu.svg`}
                    alt=""
                    className="me-2 cursor-pointer"
                    width="25px"
                />
                <div className={menulist ? "verticle-menulist" : "verticle-menulist d-none"}>
                    <div className="verticle-menu-item">
                        <input type="radio" id="this_month" value="This month" />
                        <label>This month</label>
                    </div>
                    <div className="verticle-menu-item">
                        <input type="radio" id="last_week" value="Last week" />
                        <label>Last week</label>
                    </div>
                    <div className="verticle-menu-item">
                        <input type="radio" id="last_month" value="Last month" />
                        <label>Last month</label>
                    </div>
                    <div className="verticle-menu-item">
                        <input type="radio" id="single_day" value="Single day" />
                        <label>Single day</label>
                    </div>
                    <div className="verticle-menu-item">
                        <input type="radio" id="date_range" value="Date range" />
                        <label>date range</label>
                    </div>

                </div>
            </div>

            <div className="d-flex">
                <div className="border-right1 pe-3">
                    <p className="meta-head">Invoices created</p>
                    <div className="d-flex align-items-center">
                        <div className="dark-blue-bg d-flex align-items-center justify-content-center me-3">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/invoice.svg`}
                                alt=""
                            />
                        </div>
                        <p className="m-0 meta-value">20</p>
                    </div>
                </div>
                <div className="d-flex px-5">
                    <div>
                        <p className="meta-sub-head">Paid</p>
                        <div className="d-flex align-items-center">
                            <div className="blue-border-bg d-flex align-items-center justify-content-center me-3">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/check.svg`}
                                    alt=""
                                />
                            </div>
                            <p className="m-0 meta-sub-value">30</p>
                        </div>
                    </div>
                    <div className="px-5">
                        <p className="meta-sub-head">Unpaid</p>
                        <div className="d-flex align-items-center">
                            <div className=" blue-border-bg d-flex align-items-center justify-content-center me-3">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/cross.svg`}
                                    alt=""
                                />
                            </div>
                            <p className="m-0 meta-sub-value">30</p>
                        </div>
                    </div>
                    <div>
                        <p className="meta-sub-head">Overdue</p>
                        <div className="d-flex align-items-center">
                            <div className="blue-border-bg d-flex align-items-center justify-content-center me-3">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/outofstock.svg`}
                                    alt=""
                                />
                            </div>
                            <p className="m-0 meta-sub-value">30</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}