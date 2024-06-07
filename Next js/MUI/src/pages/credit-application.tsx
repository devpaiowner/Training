import CreditViewApplication from "@/components/layout/creditViewApplication";
import appContext, { AppContext } from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import Api from "@/common/apis/apis";
import { useRouter } from "next/router";
import { ReadyState } from "react-use-websocket";

interface Iprops {
  id: string;
}
export default function CreditApplication(props: Iprops) {
  const refList = useContext(appContext).refList;
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const router = useRouter();
  const { socketStatus, getLoanApplicationByIdStatus } = storeData;

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      getLoanApplicationById("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  const getLoanApplicationById = async (search?: any) => {
    setStoreData({ buttonLoading: true });
    const res = await apis.getLoanApplicationById(props?.id);
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "getLoanApplicationByIdStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (getLoanApplicationByIdStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        loanApplicationById: getLoanApplicationByIdStatus?.["data"],
      });

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
      });
    } else if (getLoanApplicationByIdStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(getLoanApplicationByIdStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        getLoanApplicationByIdStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoanApplicationByIdStatus]);

  return <CreditViewApplication />;
}
