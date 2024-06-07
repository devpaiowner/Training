import React, { useState } from "react";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import { useTranslation } from "react-i18next";

export default function BusinessToggle() {
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
  const [isBusiness, setIsBusiness] = useState(false);
  const { t } = useTranslation("common");
  return (
    <div className="card p-3 wel-switch">
      <div className=" d-flex justify-content-between align-items-center">
        <h4 className="mb-0">
          <strong>
            {t("welcome")}{" "}
            {storeData?.myProfile?.first_name &&
              storeData?.myProfile?.first_name}
          </strong>
        </h4>
        {/* <div>
          <strong>{t("switch_cred")}</strong>
          <label className="switch mx-2">
            <input
              type="checkbox"
              className="switch-input"
              checked={isBusiness}
              onClick={() => {
                setIsBusiness(!isBusiness);
              }}
            />
            <span className="switch-toggle-slider">
              <span className="switch-on"></span>
              <span className="switch-off"></span>
            </span>
          </label>
          <strong className="ms-5">{t("switch_business")}</strong>
        </div> */}
      </div>
    </div>
  );
}
