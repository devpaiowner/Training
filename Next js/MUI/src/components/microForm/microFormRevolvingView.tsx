import React, { useContext, useEffect, useRef, useState } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useTranslation } from "react-i18next";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Iprops { }

export default function MicroFormRevolvingView() {
  const [agentCall, serAgentCall] = useState(false);
  const [docName, setDocName] = useState("Document");
  const { t } = useTranslation("loanForm");
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );

  useEffect(() => {
    switch (storeData?.purpose) {
      case "Payroll advance": {
        setDocName(t("pay_slips_bank_statement"));
        break;
      }
      case "Emergency expenses": {
        setDocName(t("emergency_need"));
        break;
      }
      case "Office space": {
        setDocName(t("pay_rental_invoice"));
        break;
      }
      case "Inventory": {
        setDocName(t("pay_invoice"));
        break;
      }
      default: {
        setDocName(t("other"));
      }
    }
  }, []);

  const swiperRef = useRef<SwiperCore>();
  return (
    <>
      <div className="justify-content-between d-flex">
        <p className="display-7 text-dblue mt-1">{t("inventory_documents")}</p>
        <div className="text-end" style={{ marginBottom: "20px" }}>
          <button
            type="button"
            className="btn btn-blue btn-icon me-2 p-0"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <MdOutlineKeyboardArrowLeft size={30} />
          </button>
          <button
            type="button"
            className="btn btn-blue btn-icon me-2 p-0"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <MdOutlineKeyboardArrowRight size={30} />
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={10}
        // slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="document-carousel"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {storeData?.multipleInvoiceList?.length > 0 &&
          storeData?.multipleInvoiceList?.map((item, index) => {
            return (
              <SwiperSlide className="document-carousel" key={index}>
                <div className="item">
                  <div className="doc-upload">
                    <h6>{item?.brandName}</h6>

                    <div>
                      <p className="text-dblue mb-0 px-3">
                        {t("purchase_order_financed")}
                      </p>
                      <hr className="mt-0 mx-3" />
                      <div className="d-flex justify-content-between align-items-center m-3">
                        <label className="text-black">
                          <span className="icon-document ti-md me-2"></span>
                          {t("lpo")}
                        </label>
                        <span>
                          <b>{item?.lpoDoc?.title}</b>
                          <Link
                            href={item?.lpoDoc?.file || ""}
                            target="_blank"
                            className="icon-view ms-1"
                          >
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-dblue mt-2 mb-0 px-3">
                        {t("invoices_with_the_supplier")}
                      </p>
                      <hr className="mt-0 mx-3" />
                      <div className="d-flex justify-content-between align-items-center m-3">
                        <label className="text-black">
                          <span className="icon-document ti-md me-2"></span>
                          {t("invoice_slip_1")}
                        </label>
                        <span>
                          <b>{item?.lastInvoice1?.title}</b>

                          <Link
                            href={item?.lastInvoice1?.file || ""}
                            target="_blank"
                            className="icon-view ms-1"
                          >
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </Link>
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center m-3">
                      <label className="text-black">
                        <span className="icon-document ti-md me-2"></span>
                        {t("invoice_slip_2")}
                      </label>
                      <span>
                        <b>{item?.lastInvoice2?.title}</b>
                        <Link
                          href={item?.lastInvoice2?.file || ""}
                          target="_blank"
                          className="icon-view ms-1"
                        >
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </Link>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center m-3">
                      <label className="text-black">
                        <span className="icon-document ti-md me-2"></span>
                        {t("invoice_slip_3")}
                      </label>
                      <span>
                        <b>{item?.lastInvoice3?.title}</b>
                        <Link
                          href={item?.lastInvoice3?.file || ""}
                          target="_blank"
                          className="icon-view ms-1"
                        >
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </Link>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center m-3">
                      <label className="text-black">
                        <span className="icon-document ti-md me-2"></span>
                        {t("invoice_slip_4")}
                      </label>
                      <span>
                        <b>{item?.lastInvoice4?.title}</b>
                        <Link
                          href={item?.lastInvoice4?.file || ""}
                          target="_blank"
                          className="icon-view ms-1"
                        >
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </Link>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center m-3">
                      <label className="text-black">
                        <span className="icon-document ti-md me-2"></span>
                        {t("invoice_slip_5")}
                      </label>
                      <span>
                        <b>{item?.lastInvoice5?.title}</b>
                        <Link
                          href={item?.lastInvoice5?.file || ""}
                          target="_blank"
                          className="icon-view ms-1"
                        >
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </Link>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center m-3">
                      <label className="text-black">
                        <span className="icon-document ti-md me-2"></span>
                        {t("invoice_slip_6")}
                      </label>
                      <span>
                        <b>{item?.lastInvoice6?.title}</b>
                        <Link
                          href={item?.lastInvoice6?.file || ""}
                          target="_blank"
                          className="icon-view ms-1"
                        >
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
