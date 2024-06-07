import React from "react";
export default function CreateSale() {
    return (
        <div className="create-sale d-flex white-card mb-4 p-4">
            <div className="w-70 pe-5">
                <p className="meta-head">Create Sales</p>
                <p className="date-select fst-normal m-0">Start by Creating your first Sales and view key metrics on your dashboard</p>
            </div>
            <div className="w-30">
                <div className="yellow-border-bg  d-flex align-items-center justify-content-center mb-2 mx-auto">
                    <img height="20px"
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/add-customer.svg`}
                        alt=""

                    />
                </div>
                <p className="add-new m-0 text-center">Create Sales</p>
            </div>
        </div>
    )
}