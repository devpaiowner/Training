import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import moment from "moment";
import { toast } from "react-toastify";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import { useTranslation } from "react-i18next";

export default function SwitchScore() {
  const [isSwitchScore, setIsSwitchScore] = useState(false);
  const [applicationType, setApplicationType] = useState(true);

  const { t } = useTranslation("common");
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
  const { creditSummary } = storeData;

  const scoreStatus = (val: number) => {
    if (val >= 300 && val <= 579) return t("poor");
    else if (val >= 580 && val <= 669) return t("fair");
    else if (val >= 670 && val <= 739) return t("good");
    else if (val >= 740 && val <= 799) return t("very_good");
    else if (val >= 800 && val <= 850) return t("exceptional");
  };

  return (
    <div className="col-md-6">
      <div className="card p-4 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-black m-0">{t("switch_score")}</h3>
          <p className="text-ylow m-0 text-center">
            <span className="icon-Rewards display-4 d-block"></span>
            {t("my_rewards")}
          </p>
        </div>
        <div className="right-progress mt-3">
          <div className="d-flex justify-content-between align-items-end">
            <p>
              <strong className="text-ylow display-3">
                {creditSummary?.credit_score ?? 0}
              </strong>
              {moment().format("DD/MM/YYYY")}
            </p>
            <p className="text-blue mb-1">
              {t("your_credit_score_is")}
              <small className="bg-excellent">
                {scoreStatus(creditSummary?.credit_score)}
              </small>
            </p>
          </div>

          <div
            className="progress my-1"
            style={{
              height: "8px",
            }}
          >
            <div
              className="progress-bar bg-score"
              role="progressbar"
              style={{
                width: `${(creditSummary?.credit_score / 850) * 100 ?? 0}%`,
              }}
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="d-flex justify-content-between text-black progress-status">
            <p>{t("poor")}</p>
            <p>{t("good")}</p>
            <p>{t("excellent")}</p>
          </div>
          <hr className="my-4" />
          <div className="d-flex justify-content-between">
            <span className="icon-Information ti-lg me-2">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
            </span>
            <p>{t("how_improve_credit_score")}</p>
            <Link href="#">
              <span className="icon-circle-arrow ti-lg">
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
