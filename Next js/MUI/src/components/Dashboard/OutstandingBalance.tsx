import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import { toast } from "react-toastify";
import MoneyInput from "../form/MoneyInput";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { ReadyState } from "react-use-websocket";

interface IProps {
  hydrated: boolean;
}

export default function OutstandingBalance(props: IProps) {
  const [isCreditScore, setIsCreditScore] = useState(false);
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const [isApplicationTypeMicro, setIsApplicationTypeMicro] = useState(true);
  const router = useRouter();
  const apis = (useContext(appContext) as AppContext).apis as Api;

  const { t } = useTranslation("common");
  const { getCreditSummaryStatus, socketStatus } = storeData;

  useEffect(() => {
    setIsApplicationTypeMicro(true);
  }, []);

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      if (isApplicationTypeMicro) {
        getCreditSummary("micro");
      } else {
        getCreditSummary("revolving");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApplicationTypeMicro, socketStatus]);

  const toggleApplicationType = (isMicroType: boolean) => {
    if (isMicroType) {
      setIsApplicationTypeMicro(true);
    } else {
      setIsApplicationTypeMicro(false);
    }
  };

  const getCreditSummary = async (appType: string) => {
    setStoreData({ buttonLoading: true });
    const res = await apis.getCreditSummary(appType);
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "getCreditSummaryStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (getCreditSummaryStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        creditSummary: getCreditSummaryStatus?.["data"],
      });
    } else if (getCreditSummaryStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(getCreditSummaryStatus?.["msg"]);
    }
    return () => {
      setStoreData({
        getCreditSummaryStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCreditSummaryStatus]);

  return (
    <div className="col-md-6">
      <div className="card left-progress h-100">
        <div className="blue-card p-4 d-flex justify-content-between">
          <p className="text-white w-50">
            <small className="text-ylow">
              {t("as_on")} {moment().format("DD/MM/YYYY")}
            </small>
            <strong className="text-ylow">
              <MoneyInput
                data={Number(
                  storeData?.creditSummary?.outstanding_amount ?? 0
                ).toFixed(0)}
              />
            </strong>
            {t("outstanding_balance")}
          </p>
          <div className="bcrd-right text-end">
            <span className="icon-data ti-lg d-block"></span>
            <Link
              href={"/loan-application"}
              className={
                props?.hydrated ? "btn btn-fill" : "btn btn-fill link_disabled"
              }
            >
              {t("view_payment_summary")}
            </Link>
          </div>
        </div>
        <div className="d-flex px-4 align-items-center justify-content-between">
          <p className="w-50 text-black">{t("total_amount_paid")}</p>
          <p className="text-success-">
            <MoneyInput
              data={Number(
                storeData?.creditSummary?.total_amount_paid ?? 0
              ).toFixed(0)}
            />
          </p>
          <span>&nbsp;</span>
        </div>
        <div className="p-4 d-flex justify-content-between">
          <div>
            <h4 className="mb-0 text-black">{t("your_credit_portfolio")}</h4>
            <h6 className="text-blue fw-semibold">
              {isApplicationTypeMicro
                ? t("micro_line_of_credit")
                : t("revolving_line_of_credit")}
            </h6>
          </div>
          <span
            className="icon-circle-arrow ti-lg"
            onClick={() => {
              toggleApplicationType(!isApplicationTypeMicro);
            }}
          >
            <span className="path1"></span>
            <span className="path2"></span>
          </span>
        </div>

        <div className="blue-progress- px-4 pb-3">
          <div className="d-flex justify-content-between">
            <p className="w-50 boldyellotxt- text-black">{t("credit_utilized")}</p>
            <p>
              <MoneyInput
                data={Number(
                  storeData?.creditSummary?.total_amount ?? 0
                ).toFixed(0)}
              />
            </p>
            <span>&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
