import React from "react";
export default function SalesChart() {
    return (
        <div className="sales-chart white-card mb-4">
            <div className="sales-chart-header blue-card p-4 m-0">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <p className="m-0 chart-head">Sales</p>
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/horizontal-menu.svg`}
                        alt=""
                    />
                </div>
                <div className="d-flex">
                    <div className="d-flex sales-record">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/sales-revenue.svg`}
                            alt=""
                            className="me-3"
                        />
                        <div>
                            <p className="m-0">Sales Revenue</p>
                            <h5 className="m-0">TZS 457,891</h5>
                        </div>
                    </div>
                    <div className="d-flex sales-record">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/user.svg`}
                            alt=""
                            className="me-3"
                        />
                        <div>
                            <h5 className="m-0">10</h5>
                            <p className="m-0">Customers</p>

                        </div>
                    </div>
                </div>

            </div>
            <div className="sales-chart-content d-flex p-4 pt-5">
                <div className="pe-4 pb-5 border-right d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="m-0 chart-data-meta">31%</h5>
                        <p className="m-0 chart-data-name">Sales Revenue Growth Rate</p>
                    </div>
                    <div>
                        <h5 className="m-0 chart-data-meta">31%</h5>
                        <p className="m-0 chart-data-name">Customer Growth Rate</p>
                    </div>
                    <div>
                        <h5 className="m-0 chart-data-meta">46%</h5>
                        <p className="m-0 chart-data-name">Payments Received</p>
                    </div>
                </div>
                <div>
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/sales-bar.png`}
                        alt=""
                        className="ps-4"
                        height="305px"
                    />
                </div>

            </div>
        </div>
    )
}