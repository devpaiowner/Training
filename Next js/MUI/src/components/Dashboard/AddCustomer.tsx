import React from "react";
export default function AddCustomer() {
    return (
        <div className="add-customer d-flex white-card mb-4 p-4">
            <div className="w-70 d-flex ">
                <div className="border-right1 pe-4">
                    <p className="meta-head">Customers</p>
                    <div className="d-flex align-items-center">
                        <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                            <img height="26px"
                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/customers.svg`}
                                alt=""
                            />
                        </div>
                        <p className="m-0 meta-value">100</p>
                    </div>
                </div>
                <div className="px-5">
                    <div className="d-flex align-items-center mb-4">
                        <p className="date-select m-0">Jan 2023</p>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/down.svg`}
                            alt=""
                            className="ms-2"
                        />
                    </div>
                    <div className="d-flex align-items-center pt-2">
                        <p className="m-0 meta-value">20</p>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/grow.svg`}
                            alt=""
                            className="ms-2"
                        />
                    </div>

                </div>
            </div>
            <div className="w-30">
                <div className="yellow-border-bg  d-flex align-items-center justify-content-center mb-2 mx-auto">
                    <img height="20px"
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/add-customer.svg`}
                        alt=""

                    />
                </div>
                <p className="add-new m-0 text-center">Add Customer</p>
            </div>
        </div>
    )
}