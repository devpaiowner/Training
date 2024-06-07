import React from "react";
export default function TotalInventory() {
    return (
        <div className="total-enventory d-flex justify-content-between white-card mb-4 p-4">
            <div className="border-right1 pe-3">
                <p className="meta-head">Total Products</p>
                <div className="d-flex align-items-center">
                    <div className="dark-blue-bg d-flex align-items-center justify-content-center me-3">
                        <img height="28px"
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/inventory.svg`}
                            alt=""
                        />
                    </div>

                    <p className="m-0 meta-value">20</p>
                </div>
            </div>

            <div className=" d-flex px-3 gap-5">
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="meta-sub-head">In stock</p>
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
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="meta-sub-head">Low Stock</p>
                    <div className="d-flex align-items-center">
                        <div className=" blue-border-bg d-flex align-items-center justify-content-center me-3">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/loss.svg`}
                                alt=""
                            />
                        </div>
                        <p className="m-0 meta-sub-value">30</p>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <p className="meta-sub-head">Out of stock</p>
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
            <div className="ps-3 border-left1">
                <p className="meta-head">Total Stock Quantity</p>
                <div className="d-flex align-items-center">
                    <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                        <img height="27px"
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/stock.svg`}
                            alt=""
                        />
                    </div>
                    <p className="m-0 meta-value">200</p>
                </div>
            </div>

        </div>
    )
}