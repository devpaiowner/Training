import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Iprops {
  handleModel?: Function;
}

export default function ExitModal(props: Iprops) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { t } = useTranslation("modal");

  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  const handleClose = () => {
    props.handleModel(false);
    setShow(false);
  };

  const handleExit = () => {
    setStoreData({
      business_name: "",
      business_address: "",
      director_name: "",
      email: "",

      mobile: "",
      repayment_method: "",
      principal: "",
      supplier_payment_method: "",
      account_name: "",
      account_number: "",

      bank_name: "",
      bank_branch_code: "",
      purpose: "",
      tenure: "",

      total_monthly_income: "",
      has_alternate_income_source: "",
      alternate_income_source_desc: "",
      has_other_finance_form: "",
      other_finance_form_desc: "",
      has_existing_loan: "",

      existing_loan_type: "",
      existing_loan_amount: "",
      supplier_account_name: "",
      supplier_account_number: "",
      supplier_bank_name: "",
      supplier_bank_branch_code: "",

      supplier_business_name: "",
      supplier_mobile: "",
      application_type: "",
      purpose_other: "",

      partner: "",
      partner_full_name: "",
      partner_email: "",
      partner_mobile: "",
      trading_license: "",
      lease_agreement: "",
      title_deed: "",
      power_attorney: "",
      tbs: "",
      kycBoostFile6: "",
      kycBoostDoc6: "",

      inventoryLpo: "",
      inventoryLpoStore: "",

      tncAgree: false,

      multipleInvoiceList: [],

      payrollDoc1: "",
      payrollDoc2: "",
      payrollDoc3: "",
    });
    props.handleModel(false);
    router.push("/apply-credit");
  };
  return (
    <Modal show={show} centered>
      {/* <div className="modal-header btn_close_btn">
                    <button
                        type="button"
                        className="btn_close_icon"
                        onClick={handleClose}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/close.png`}
                            alt=""
                        />
                    </button>
                </div> */}
      <div className="modal-body text-center">
        <h4 className="text-black">{t("you_sure_you_want_exit")}</h4>
        <p className="mb-0">{t("exiting_the_application")}</p>
      </div>
      <div className="modal-footer justify-content-center d-flex text-center">
        <button
          onClick={() => {
            handleExit();
          }}
          className="btn btn-white"
        >
          {t("exit")}
        </button>
        <br />
        <button onClick={handleClose} className="btn btn-fill">
          {t("cancel")}
        </button>
      </div>
    </Modal>
  );
}
