import React, { useContext, useEffect, useState } from "react";
import InputForm from "../inputForm";
import SelectForm from "../selectForm";
import validation from "@/common/utils/validation";
import { toast } from "react-toastify";

import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import ProfileInputForm from "../profileInputForm";
import ProfileSelectForm from "../profileSelectForm";
import Cookie from "js-cookie";
import { useTranslation } from "react-i18next";
import { ReadyState } from "react-use-websocket";

export default function BusinessForm(props: {
  handleStepper: Function;
  hydrated: boolean;
}) {
  const [isBusiness, setIsBusiness] = useState(false);
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );

  const { t } = useTranslation("profile");

  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const { sectorStatus, socketStatus } = storeData;

  const fetchBusinessSectors = async () => {
    const res = await apis.getBusinessSectors({
      ...storeData,
    });
    if (res.statusCode === 200) {
      setStoreData({
        [res?.["traceId"]]: "sectorStatus",
        sectorStatusTraceId: res?.["traceId"],
      });
    } else {
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (sectorStatus !== undefined && sectorStatus?.["statusCode"] === 200) {
      const sectorFilter = sectorStatus["data"].results.map((item: any) => {
        return { value: item?.id, text: item?.name };
      });
      setStoreData({ businessSectors: sectorFilter ?? [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorStatus]);

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      fetchBusinessSectors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  const myProfile = async () => {
    const res = await apis.fetchAuthUser({});
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "authUserStatus" });
    } else {
    }
  };

  const handleOnSubmit = async (value: boolean) => {
    if (!value) {
      props.handleStepper(false);
    } else {
      const validationField = [
        "business_name",
        "address",
        "tin",
        "business_vrn",
        "business_sector",
        "auth_representative_name",
        "authorized_representative_role",
        "director_name",
        "nin",
        "registration_year",
      ];

      if (validation(storeData, validationField, setDataError, refList))
        return "";
      // * Validation END //
      props.handleStepper(true);
    }
  };

  return (
    <>
      <div id="personal-info" className="content">
        <div className="row">
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                required={true}
                label={t("business_name")}
                name="business_name"
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="address"
                required={true}
                label={t("business_address")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileSelectForm
                required={true}
                label={t("business_sector")}
                noneText="Business Sector"
                name="business_sector"
                options={storeData?.businessSectors}
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="tin"
                required={true}
                label={t("tin")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="business_vrn"
                required={true}
                label={t("vrn")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="director_name"
                required={true}
                label={t("director_name")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="nin"
                required={true}
                label={t("director_nin")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="auth_representative_name"
                required={true}
                label={t("authorized_representative_name")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="authorized_representative_role"
                required={true}
                label={t("authorized_representative_role")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div className="col-md-12 mt-0">
            <div className="form-group form_box">
              <ProfileInputForm
                name="registration_year"
                required={true}
                label={t("registration_year")}
                type="text"
                class="form-control"
                readOnly={props?.hydrated}
              />
            </div>
          </div>
          <div
            className="col-12 d-flex justify-content-end
                              align-items-center"
          >
            <button
              type="button"
              onClick={() => handleOnSubmit(false)}
              className="btn btn-white me-3"
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={() => handleOnSubmit(true)}
              className="btn btn-fill btn-next"
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
