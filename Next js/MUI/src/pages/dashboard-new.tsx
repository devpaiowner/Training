import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import SalesChart from "@/components/Dashboard/SalesChart";
import TotalEnventory from "@/components/Dashboard/TotalInventory";
import InvoiceCreate from "@/components/Dashboard/InvoiceCreate";

import AddCustomer from "@/components/Dashboard/AddCustomer";
import CreateSale from "@/components/Dashboard/CreateSale";
import PaymentSummary from "@/components/Dashboard/PaymentSummary";
import PaymentSummary2 from "@/components/Dashboard/PaymentSummary2";


export default function DashboardNew() {
    const { storeData, setStoreData, setDataError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
        })
    );
    const router = useRouter();
    const apis = (useContext(appContext) as AppContext).apis as Api;
    const refList = (useContext(appContext) as AppContext).refList;
    const [menulist, setmenulist] = useState(false);
    const manageTogglehandleClick = () => {
        setmenulist(!menulist);
    };
    return (

        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar activeClass="anchor-dashboard" />
                <div className="layout-page">
                    <NavbarBanner />
                    <div className="content-wrapper mt-4 mb-4">
                        <div className="container-xxl flex-grow-1">
                            <div className="mb-4 sales-header">
                                <h5 className="sales-title m-0">Hello John</h5>
                                <p className="sales-date m-0">1st August 2023</p>
                            </div>
                            <div>
                                <div className="d-flex gap-4 mb-4">
                                    <h6 className="sales-tabing active m-0">Sales</h6>
                                    <h6 className="sales-tabing m-0">Purchases</h6>
                                </div>
                                <div className="d-flex mb-4">
                                    <div className="w-60 pe-3">
                                        <SalesChart />
                                        <TotalEnventory />
                                        <InvoiceCreate />
                                    </div>
                                    <div className="w-40 ps-2">
                                        <AddCustomer />
                                        <CreateSale />
                                        <PaymentSummary />
                                        <PaymentSummary2 />

                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="card w-40 me-2 p-3">
                                        <div className="d-flex align-items-center pb-2">
                                            <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/repeat-customer.svg`}
                                                    alt=""
                                                />
                                            </div>
                                            <h5 className="m-0 meta-head fw-bold">Repeat Customers</h5>
                                        </div>
                                        <div className="table-responsive text-nowrap">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th >
                                                            Repeat Customers
                                                        </th>
                                                        <th > Number of Sales </th>

                                                    </tr>
                                                </thead>
                                                <tbody className="table-border-bottom-0">
                                                    <tr>
                                                        <td>Jacob Hall</td>
                                                        <td>5</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Aakash P</td>
                                                        <td>5</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Anant Sl</td>
                                                        <td>5</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Rushika P</td>
                                                        <td>5</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jacob Hall</td>
                                                        <td>5</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-flex justify-content-end p-4">
                                            <div className="d-flex pagination-wrap p-0 me-3">
                                                <span className="pagination-num current border-right2">5</span>
                                                <span className="pagination-num">20</span>
                                            </div>
                                            <div className="pagination-arrow d-flex align-items-center justify-content-center">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/next-arrow.svg`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="d-flex justify-content-end mt-5">
                                                <ul className="pagination justify-content-between">
                                                    <li className="page-item page-item first disabled">
                                                        <a className="page-link" href="#" aria-label="Go to first page"> << </a>
                                                    </li>
                                                    <li className="page-item page-item prev disabled">
                                                        <a className="page-link" href="#" aria-label="Go to previous page"><</a>
                                                    </li>
                                                    <li className="page-item page-item active">
                                                        <a className="page-link undefined" href="#" aria-label="Go to page number 1">1</a>
                                                    </li>
                                                    <li className="page-item page-item next disabled">
                                                        <a className="page-link" href="#" aria-label="Go to next page">></a>
                                                    </li>
                                                    <li className="page-item page-item last disabled">
                                                        <a className="page-link" href="#" aria-label="Go to last page">>></a>
                                                    </li>
                                                </ul>
                                            </div> */}
                                    </div>
                                    <div className="sales-product card w-60 ms-3 p-3">
                                        <div className="pb-2">

                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="light-blue-bg d-flex align-items-center justify-content-center me-3">
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/sales.png`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <h5 className="m-0 meta-head fw-bold">Sales per Product/SKU</h5>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">


                                                    <div className="d-flex justify-content-end position-relative salespPro-filter">
                                                        <img onClick={() => manageTogglehandleClick()}
                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dark-horizontalmenu.svg`}
                                                            className="cursor-pointer"
                                                            alt=""
                                                            width="25px"
                                                        />
                                                        <div className={menulist ? "verticle-menulist" : "verticle-menulist d-none"}>
                                                            <div className="verticle-menu-item">
                                                                <div className="d-flex align-items-center">
                                                                    <img
                                                                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/grow.svg`}
                                                                        alt=""
                                                                        className="me-2"
                                                                    />
                                                                    <p className="m-0 payment-head">High - Low</p>
                                                                </div>
                                                            </div>
                                                            <div className="verticle-menu-item">
                                                                <div className="d-flex align-items-center">
                                                                    <img
                                                                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/loss.svg`}
                                                                        alt=""
                                                                        className="me-2"
                                                                        height="18px"
                                                                    />
                                                                    <p className="m-0 payment-head">Low-High</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="table-responsive text-nowrap">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th >
                                                            Product Name
                                                        </th>
                                                        <th >SKU</th>
                                                        <th >
                                                            Reference No.
                                                        </th>
                                                        <th >
                                                            Total Sales
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-border-bottom-0">
                                                    <tr>
                                                        <td>Parle - G</td>
                                                        <td>50987</td>
                                                        <td>50987</td>
                                                        <td>TZS 600000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parle - G</td>
                                                        <td>50987</td>
                                                        <td>50987</td>
                                                        <td>TZS 50000000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parle - G</td>
                                                        <td>50987</td>
                                                        <td>50987</td>
                                                        <td>TZS 3000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parle - G</td>
                                                        <td>50987</td>
                                                        <td>50987</td>
                                                        <td>TZS 70988</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parle - G</td>
                                                        <td>50987</td>
                                                        <td>50987</td>
                                                        <td>TZS 50000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-flex justify-content-end p-4">
                                            <div className="d-flex pagination-wrap p-0 me-3">
                                                <span className="pagination-num current border-right2">5</span>
                                                <span className="pagination-num">20</span>
                                            </div>
                                            <div className="pagination-arrow d-flex align-items-center justify-content-center">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/next-arrow.svg`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>

            <div className="layout-overlay layout-menu-toggle"></div>

            <div className="drag-target"></div>
        </div >

    );
}
