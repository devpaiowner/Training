/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import validation from "@/common/utils/validation";
import { toast } from "react-toastify";

import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import { useRouter } from "next/router";
import { KYC_DOCS } from "@/common/utils/constant";
import { useTranslation } from "react-i18next";
import ProfileUploadInputForm from "../profileUploadInputForm";

export default function BusinessDocumentsForm(props: {
  handleStepper: Function;
  hydrated: boolean;
}) {
  const { t } = useTranslation("profile");
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
  const [documents, setDocuments] = useState({});
  const myProfile = async () => {
    const res = await apis.fetchAuthUser({});
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "authUserStatus" });
    } else {
      setStoreData({ buttonLoading: false });
    }
  };

  const router = useRouter();
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;

  const handleOnSubmit = async (value: boolean) => {
    try {
      if (!value) {
        props.handleStepper(false);
      } else {
        const validationField = [
          "vrn",
          "certificate_of_registration",
          "tax_clearance",
          "certificate_of_incorporation",
          "director_id_1",
          "director_id_2",
          "tin_certificate",
        ];

        if (validation(storeData, validationField, setNewError, refList))
          return "";

        setStoreData({ buttonLoading: true });
        const res = await apis.updateBusinessProfile({
          ...storeData,
        } as any);
        if (res.statusCode === 200) {
          setStoreData({ [res?.["traceId"]]: "businessProfileStatus" });
        } else {
          setStoreData({ buttonLoading: false });
          toast.error(res?.["message"]);
        }
      }
    } catch (err) {
      console.log("ERRRRRRRR ", err);
    }
  };

  useEffect(() => {
    if (
      storeData.businessProfileStatus !== undefined &&
      storeData.businessProfileStatus?.["statusCode"] === 200
    ) {
      myProfile();
      setStoreData({ buttonLoading: false });
      toast.success(t("profile_update_toast"));
      router.push("/");
    } else if (
      storeData.businessProfileStatus !== undefined &&
      storeData.businessProfileStatus?.["statusCode"] !== 200
    ) {
      setStoreData({ buttonLoading: false });
      toast.error(storeData.businessProfileStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        businessProfileStatus: undefined,
      });
    };
  }, [storeData.businessProfileStatus]);

  return (
    <>
      <div id="social-links" className="content">
        <div className="row">
          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_certificate_of_registration")}
              name="certificate_of_registration"
              type={KYC_DOCS}
              value={documents?.["certificate_of_registration"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>
          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_tax_clearance")}
              name="tax_clearance"
              type={KYC_DOCS}
              required
              value={documents?.["tax_clearance"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>
          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_certificate_of_incorporation")}
              name="certificate_of_incorporation"
              type={KYC_DOCS}
              value={documents?.["certificate_of_incorporation"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>
          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_director_id_first")}
              name="director_id_1"
              type={KYC_DOCS}
              value={documents?.["director_id_1"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>
          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_director_id_second")}
              name="director_id_2"
              type={KYC_DOCS}
              value={documents?.["director_id_2"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>

          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_tin_business")}
              name="tin_certificate"
              type={KYC_DOCS}
              value={documents?.["tin_certificate"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>
          <div className="col-md-12">
            <ProfileUploadInputForm
              label={t("upload_vrn")}
              name="vrn"
              type={KYC_DOCS}
              value={documents?.["vrn"]}
              readOnly={props?.hydrated}
              disable={props?.hydrated}
            />
          </div>
          <div className="col-md-12">
            <div className="form-group form_box">
              <h4>{t("other_documents")}</h4>
              <div className="other_D">
                <ProfileUploadInputForm
                  label={t("other")}
                  name="otherDoc1"
                  type={KYC_DOCS}
                  isBox
                  readOnly={props?.hydrated}
                  disable={props?.hydrated}
                />
                <ProfileUploadInputForm
                  label={t("other")}
                  name="otherDoc2"
                  type={KYC_DOCS}
                  isBox
                  readOnly={props?.hydrated}
                  disable={props?.hydrated}
                />
                <ProfileUploadInputForm
                  label={t("other")}
                  name="otherDoc3"
                  type={KYC_DOCS}
                  isBox
                  readOnly={props?.hydrated}
                  disable={props?.hydrated}
                />
              </div>
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
              className="btn btn-fill btn-next"
              onClick={() => handleOnSubmit(true)}
            >
              {t("update")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
