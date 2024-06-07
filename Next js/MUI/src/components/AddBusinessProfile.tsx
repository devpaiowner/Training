import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import NavbarBanner from "@/components/layout/NavbarBanner";
import UploadDocuments from "@/components/BusinessKycLayout/UploadDocuments";
import BusinessInfo from "@/components/BusinessKycLayout/BusinessInfo";
import { resValidation } from "@/common/utils/validation";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import KycModal from "@/components/modalBox/kycModal";
import Sidebar from "@/components/SidebarLayout";

import { useRouter } from "next/router";

interface IFormInputs {
  business_name: string;
  business_sector: string;
  tin: number;
  director_name: string;
  nin: string;
  authorized_representative_role: string;
  registration_year: string;
  certificate_of_incorporation: string;
  bank_ststement: string;
  certificate_of_registration: string;
  tax_clearance: string;
  tin_certificate: string;
  director_id_1: string;
  director_id_2: string;
  vrn: string;
  auth_representative_name: string;
}

export default function AddBusinessProfile() {
  const [showModal, setShowModal] = useState(false);
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
  const router = useRouter();
  const kycErrorMessage = useTranslation("kycErrorMessage").t;
  const schema = yup.object().shape({
    business_name: yup.string().required(kycErrorMessage("business_name")),
    business_sector: yup.string().required(kycErrorMessage("business_sector")),
    tin: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required(kycErrorMessage("tin"))
      .nullable()
      .test(
        "len",
        kycErrorMessage("tin_lessthan"),
        (val) => val.toString().length <= 9
      )
      .test(
        "len",
        kycErrorMessage("tin_morethan"),
        (val) => val.toString().length >= 9
      ),
    director_name: yup.string().required(kycErrorMessage("director_name")),
    nin: yup.string().required(kycErrorMessage("nin")),
    authorized_representative_role: yup
      .string()
      .required(kycErrorMessage("auth_representative_role")),
    auth_representative_name: yup
      .string()
      .required(kycErrorMessage("auth_representative_name")),
    registration_year: yup.string().required(kycErrorMessage("years_oper")),
    certificate_of_incorporation: yup
      .string()
      .required(kycErrorMessage("certificate_of_incorporation")),
    bank_ststement: yup.string(), //.required(kycErrorMessage("bank_statement")),
    certificate_of_registration: yup
      .string()
      .required(kycErrorMessage("certificate_of_registration")),
    tax_clearance: yup.string(), //.required(kycErrorMessage("tax_clearance")),
    tin_certificate: yup.string().required(kycErrorMessage("tin_certificate")),
    director_id_1: yup.string().required(kycErrorMessage("director_id_1")),
    director_id_2: yup.string(), //.required(kycErrorMessage("director_id_2")),
    vrn: yup
      .string()
      .required(kycErrorMessage("vrn"))
      .matches(/^[a-zA-Z0-9_]*$/, kycErrorMessage("vrn_alphanumeric"))
      .min(9, kycErrorMessage("vrn_min"))
      .max(9, kycErrorMessage("vrn_max")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema as any) as any,
  });
  const { businessProfileStatus, myProfile } = storeData;

  const onSubmit = async (data) => {
    const res = await apis.createBusinessProfile(
      {
        ...data,
      },
      { ...storeData }
    );
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "businessProfileStatus" });
      setStoreData({
        buttonLoading: false,
        avatar: myProfile?.avatar,
        myProfile: {
          ...myProfile,
          // add this flag to hide the dashboard banner
          has_business_profile: true,
        },
      });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
      if (res?.error?.[0]?.message) {
        resValidation(res?.error?.[0]?.message, setDataError, refList);
      }
    }
  };

  const handleDocData = (val: any) => {
    setValue(val, "");
  };

  useEffect(() => {
    if ([200, 201].includes(businessProfileStatus?.["statusCode"])) {
      setShowModal(true);
      setStoreData({
        businessProfile: businessProfileStatus["data"],
      });
    } else if (
      businessProfileStatus &&
      businessProfileStatus?.["statusCode"] !== 200
    ) {
      setStoreData({ buttonLoading: false });
      toast.error(businessProfileStatus?.["msg"]);
    }
    return () => {
      setStoreData({
        businessProfileStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessProfileStatus]);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar activeClass="Profile Setup" />
          <div className="layout-page">
            <NavbarBanner />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md">
                      <div className="card form_content">
                        <BusinessInfo register={register} errors={errors} />
                        <div className="form_1 docform">
                          <div className="card-header pt-0 py-0 pb-4">
                            <h5 className="head_form head_b"></h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <UploadDocuments
                                register={register}
                                control={control}
                                errors={errors}
                                handleDocData={handleDocData}
                              />
                            </div>

                            <div className="row align-items-end">
                              <div className="col-md-6 text-start">
                                <button
                                  className={"btn btn-fill"}
                                  type="submit"
                                  value={t("submit")}
                                >
                                  {t("submit")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>

        <div className="drag-target"></div>
      </div>

      {showModal && (
        <KycModal showModal={showModal} handleModel={setShowModal} />
      )}
    </>
  );
}
