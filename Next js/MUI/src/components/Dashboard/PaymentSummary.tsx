import React from "react";
export default function PaymentSummary() {
    return (
        <div className="payment-summary white-card mb-4 p-4">
            <div className="d-flex justify-content-between align-items-center border-bottom1 pb-4 mb-2">
                <p className="meta-head">Payments Summary</p>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dark-horizontalmenu.svg`}
                    alt=""
                    className="me-2"
                    width="25px"
                />
            </div>
            <div className="d-flex align-items-center mb-4">
                <div className="dark-blue-bg d-flex align-items-center justify-content-center me-3">
                    <img height="26px"
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/ammount-recieve.svg`}
                        alt=""
                    />
                </div>

                <div>
                    <p className="m-0 payment-head">Total Amount received   </p>
                    <h5 className="m-0 payment-sub-meta">TZS 1,00,000,000,000</h5>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                    <img height="30px"
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/ammount-due.svg`}
                        alt=""
                    />
                </div>

                <div>
                    <p className="m-0 payment-head">Total Amount Due </p>
                    <h5 className="m-0 payment-meta">TZS 12,67,325, 000, 000</h5>
                </div>
            </div>
        </div>
    )
}