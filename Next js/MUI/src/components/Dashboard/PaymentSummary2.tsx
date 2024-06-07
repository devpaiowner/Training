import React from "react";
export default function PaymentSummary2() {
    return (
        <div className="payment-summary white-card p-4">
            <div className="d-flex justify-content-between align-items-center border-bottom1 pb-4 mb-2">
                <p className="meta-head">Payment Mode Summary </p>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dark-horizontalmenu.svg`}
                    alt=""
                    className="me-2"
                    width="25px"
                />
            </div>
            <div className="d-flex align-items-center mb-4">
                <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/cash.svg`}
                        alt=""
                    />
                </div>
                <div>
                    <p className="m-0 payment-head">Cash </p>
                    <h5 className="m-0 payment-meta">TZS 3,000,000.00</h5>
                </div>
            </div>
            <div className="d-flex align-items-center mb-4">
                <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/upload.svg`}
                        alt=""
                    />
                </div>
                <div>
                    <p className="m-0 payment-head">Online (Mobile money, Credit/Debit Card) </p>
                    <h5 className="m-0 payment-meta">TZS 300,000</h5>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="dark-blue-bg d-flex align-items-center justify-content-center me-3">
                    <img height="20px"
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/card.png`}
                        alt=""
                    />
                </div>

                <div>
                    <p className="m-0 payment-head">Credit</p>
                    <h5 className="m-0 payment-meta">TZS 4,000</h5>
                </div>
            </div>
        </div>
    )
}