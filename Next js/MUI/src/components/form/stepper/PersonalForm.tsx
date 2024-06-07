/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import InputForm from "../inputForm";
import SelectForm from "../selectForm";
import validation from "@/common/utils/validation";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import { IMG_PATH, KYC_DOCS, PROFILE_DOCS } from "@/common/utils/constant";
import ProfileUploadInputForm from "../profileUploadInputForm";
import ProfileInputForm from "../profileInputForm";
import ProfileSelectForm from "../profileSelectForm";

export default function AccountForm(props: { handleStepper: Function }) {
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
  const { myProfile } = storeData;

  useEffect(() => {
    const date = moment(myProfile?.dob).format("yyyy-MM-DD");
    setStoreData({
      first_name: myProfile?.first_name,
      last_name: myProfile?.last_name,
      email: myProfile?.email,
      role: myProfile?.role,
      phone: myProfile?.mobile,
      nationality: myProfile?.nationality,
      dob: date,
      avatar: myProfile?.avatar,
    });
  }, [myProfile]);

  const handleOnSubmit = async () => {
    const validationField = ["first_name", "last_name", "dob"];
    if (validation(storeData, validationField, setDataError, refList))
      return "";

    setStoreData({ buttonLoading: true });
    const res = await apis.updateUser({
      ...storeData,
    });

    if (res.statusCode === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({ [res?.["traceId"]]: "authUserStatus" });
      props.handleStepper(true);
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  return (
    <>
      <div id="account-details" className="content">
        <div className="d-flex align-items-center mb-3">
          <div className="st_icon profile_img">
            <img
              src={
                storeData?.["avatar"]
                  ? storeData?.["avatar"]?.file || storeData?.["avatar"]
                  : `${process.env.NEXT_PUBLIC_BASEPATH}/images/profile.png`
              }
              alt=""
            />
          </div>
          <ProfileUploadInputForm
            button
            label=""
            name="avatar"
            type={PROFILE_DOCS}
          />
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group form_box">
              <ProfileInputForm
                label={t("first_name")}
                name="first_name"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group form_box">
              <ProfileInputForm
                label={t("last_name")}
                name="last_name"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group form_box">
              <ProfileSelectForm
                label={t("nationality")}
                name="nationality"
                noneText={t("select_country")}
                options={storeData?.countryList}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group form_box">
              <ProfileInputForm
                label={t("dob")}
                name="dob"
                type="date"
                class="form-control"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group form_box">
              <ProfileInputForm
                label={t("email_address")}
                readOnly={true}
                disable={true}
                name="email"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div className="col-md-12">
            <ProfileInputForm
              label={t("mobile")}
              readOnly={true}
              disable={true}
              name="phone"
              type="text"
              class="form-control"
              extraStyle={true}
            />
          </div>
          <div className="col-md-12">
            <div className="form-group form_box">
              <ProfileSelectForm
                readOnly={true}
                label={t("user_type")}
                noneText={t("select_user")}
                name="role"
                options={[
                  {
                    value: "anchor_partner",
                    text: t("anchor_partner"),
                  },
                  {
                    value: "distributor",
                    text: t("distributor"),
                  },
                ]}
              />
            </div>
          </div>
          <div
            className="col-12 d-flex justify-content-end
                              align-items-center"
          >
            <button
              type="button"
              onClick={() => handleOnSubmit()}
              className="btn btn-fill  btn-next"
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
