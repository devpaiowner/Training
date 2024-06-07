/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import Cookie from "js-cookie";
import useStore, { IStore } from "@/common/zustand/store";
import NavbarBanner from "@/components/layout/NavbarBanner";
import { useTranslation } from "react-i18next";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { BsChevronRight } from "react-icons/bs";
import Sidebar from "@/components/SidebarLayout";
import AccountForm from "@/components/form/stepper/PersonalForm";
import BusinessForm from "@/components/form/stepper/BusinessForm";
import BusinessDocumentsForm from "@/components/form/stepper/BusinessDocumentsForm";
import { UploadedModal } from "@/components/modalBox/uploadedModal";
import ChangeRequestBox from "@/components/modalBox/changeRequestBox";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [stepper, setStepper] = useState(0);
  const [modelToggle, setModelToggle] = useState(false);
  const [fileName, setFileName] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const { t } = useTranslation("profile");
  const handleModal = (value: boolean) => {
    setShowModal(value);
  };
  useEffect(() => {
    setHydrated(true);
  }, []);

  const handelInitaeChange = (value?: boolean) => {
    setModelToggle(value);
  };
  const handleStepper = (event: boolean) => {
    if (event) {
      setStepper(stepper + 1);
    } else {
      setStepper(stepper - 1);
    }
  };

  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );

  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;

  const {
    socketStatus,
    countryStatus,
    myProfile,
    businessesStatus,
    authUserStatus,
    businessProfile,
    avatar,
  } = storeData;

  const handleCountries = async () => {
    const res = await apis.getCountries({
      ...storeData,
    });
    if (res.statusCode === 200) {
      setStoreData({
        [res?.["traceId"]]: "countryStatus",
        countryStatusTraceId: res?.["traceId"],
      });
    } else {
      toast.error(res?.["message"]);
    }
  };
  const fetchBusiness = async () => {
    const res = await apis.apiClient(urls.common.Business);
    if (res.statusCode === 200) {
      setStoreData({
        [res?.["traceId"]]: "businessesStatus",
      });
    } else {
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (businessesStatus?.["statusCode"] === 200) {
      const data = businessesStatus["data"].results[0];
      if (data) {
        setStoreData({
          businessProfile: data,
        });
      }
    }
  }, [businessesStatus]);

  useEffect(() => {
    if (countryStatus?.["statusCode"] === 200) {
      const countryFilter = countryStatus?.["data"]?.countries?.map((item) => {
        return { value: item?.name, text: item?.name };
      });
      setStoreData({ countryList: countryFilter ?? [] });
    }
  }, [countryStatus]);

  useEffect(() => {
    setStoreData({ PurchaseToggle: false });
    if (socketStatus === 1) {
      fetchBusiness();
      handleCountries();
    }
  }, [socketStatus]);

  const fetchAuthUser = async () => {
    const res = await apis.fetchAuthUser({});
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "authUserStatus" });
    } else {
    }
  };

  useEffect(() => {
    if (socketStatus === 1 && !isProfile) {
      fetchAuthUser();
      setIsProfile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  useEffect(() => {
    if (
      authUserStatus !== undefined &&
      authUserStatus?.["statusCode"] === 200
    ) {
      setStoreData({
        myProfile: authUserStatus?.["data"],
        avatar: authUserStatus?.["data"]?.avatar,
      });
    } else if (
      authUserStatus !== undefined &&
      authUserStatus?.["statusCode"] !== 200
    )
      return () => {
        setStoreData({
          authUserStatus: undefined,
        });
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserStatus]);

  async function downloadImage(imageSrc, name) {
    const response = await fetch(imageSrc);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = name;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

  const showFileView = (doc) => {
    const filePath = doc.file;
    const fileName = doc.title;
    const extension = filePath.substring(filePath.lastIndexOf("."));
    if (extension === ".pdf" || extension === ".docx" || extension === ".doc") {
      downloadImage(filePath, fileName);
    } else {
      // IMG_PATH
      setImageUrl(filePath);
      setFileName(documentTitle(doc.document_type));
      setShowModal(true);
    }
  };

  const documentTitle = (key) => {
    switch (key) {
      case "certificate_of_registration":
        return t("certificate_of_reg_seprator");

      case "tax_clearance":
        return t("tax_clearance_seprator");

      case "certificate_of_incorporation":
        return t("certificate_of_incorporation_seprator");

      case "director_id_1":
        return t("director_id_first_seprator");

      case "director_id_2":
        return t("director_id_second_seprator");

      case "tin_certificate":
        return t("tin_certificate_seprator");

      case "vrn":
        return t("vrn_seprator");

      default:
        return t("other_documents_seprator");
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar activeClass="Profile" />
        <div className="layout-page">
          <NavbarBanner />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-5">
                  <div className="card mb-4">
                    <div className="user_details_sec card-body">
                      <div className="profile_img">
                        <img
                          src={
                            avatar
                              ? avatar?.file || avatar
                              : `${process.env.NEXT_PUBLIC_BASEPATH}/images/profile.png`
                          }
                          alt=""
                        />
                        <h4 className="user_name">
                          {myProfile && myProfile?.full_name}
                        </h4>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body user_information">
                      <small className="card-text text-uppercase">
                        {t("user_profile")}
                      </small>

                      <ul className="list-unstyled mb-4 mt-3">
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("name_seprator")}
                          </span>
                          <span>{myProfile && myProfile?.full_name}</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("business_email_seprator")}
                          </span>
                          <span>{myProfile?.email}</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("nationality_seprator")}
                          </span>
                          <span>{myProfile?.nationality}</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("mobile_seprator")}
                          </span>
                          <span>{myProfile?.mobile}</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("dob_seprator")}
                          </span>
                          <span>
                            {myProfile &&
                              moment(myProfile?.dob).format("DD MMM YYYY")}
                          </span>
                        </li>
                      </ul>

                      <hr />
                      <small className="card-text text-uppercase">
                        {t("business_details")}
                      </small>
                      <ul className="list-unstyled mb-4 mt-3">
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("business_name_seprator")}
                          </span>
                          <span>{myProfile?.business_name}</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("business_sector_seprator")}
                          </span>
                          <span>{businessProfile?.business_sector?.name}</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("business_address_seprator")}
                          </span>
                          <span>
                            {businessProfile?.address?.properties?.street}
                          </span>
                        </li>

                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("tin_seprator")}
                          </span>
                          <span>{businessProfile?.tin}</span>
                        </li>

                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("director_name_seprator")}
                          </span>
                          <span>
                            {businessProfile?.director_profiles_data[0]?.name ||
                              businessProfile?.director_profiles_data[0]
                                ?.full_name}
                          </span>
                        </li>

                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("director_nin_seprator")}
                          </span>
                          <span>
                            {businessProfile?.director_profiles_data[0]?.nin}
                          </span>
                        </li>

                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("authorized_representative_name_seprator")}
                          </span>
                          <span>
                            {
                              businessProfile?.authorized_representatives[0]
                                ?.full_name
                            }
                          </span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("authorized_representative_role_seprator")}
                          </span>
                          <span>
                            {
                              businessProfile?.authorized_representatives[0]
                                ?.role
                            }
                          </span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("registration_year_seprator")}
                          </span>
                          <span>
                            {myProfile && businessProfile?.registration_year}
                          </span>
                        </li>

                        <li className="d-flex align-items-center">
                          <span className="fw-bold mx-2 f_name">
                            {t("vrn_seprator")}
                          </span>
                          <span>{businessProfile?.vrn}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h6 className="card-text text-black text-uppercase">
                    {t("uploaded_documents")}
                  </h6>
                  <div className="card mb-4 user_information">
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        {businessProfile?.documents.map((doc, idx) => {
                          return (
                            <li
                              key={idx}
                              className="d-flex align-items-center justify-content-between"
                            >
                              <span className="fw-bold mx-2 f_name">
                                {documentTitle(doc.document_type)}
                              </span>
                              <span onClick={() => showFileView(doc)}>
                                <u
                                  className="link-pointer"
                                  style={{
                                    color: "#08485C",
                                  }}
                                >
                                  {t("view")}
                                </u>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="text-center mt-3 request_chnage_btn">
                        <button
                          onClick={() => {
                            handelInitaeChange(true);
                          }}
                          className={"btn btn-blue"}
                          data-bs-toggle="modal"
                          data-bs-target="#kyc_update"
                        >
                          {" "}
                          {t("initiate_change_request")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-7">
                  <div className="bs-stepper wizard-numbered mt-2 user_profile_edit_form">
                    <div className="bs-stepper-header">
                      <div className="step" data-target="#account-details">
                        <button type="button" className="step-trigger">
                          <span className="bs-stepper-circle">1</span>
                          <span className="bs-stepper-label">
                            <span className="bs-stepper-title">
                              {t("personal_information")}
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <BsChevronRight />
                      </div>
                      <div className="step" data-target="#personal-info">
                        <button type="button" className="step-trigger">
                          <span
                            className="bs-stepper-circle"
                            style={
                              stepper == 1 || stepper == 2
                                ? {
                                    backgroundColor: "#F6B100",
                                  }
                                : {
                                    backgroundColor: "#f1f0f2",
                                  }
                            }
                          >
                            2
                          </span>
                          <span className="bs-stepper-label">
                            <span className="bs-stepper-title">
                              {t("business_information")}
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <BsChevronRight />
                      </div>
                      <div className="step" data-target="#social-links">
                        <button type="button" className="step-trigger">
                          <span
                            className="bs-stepper-circle"
                            style={
                              stepper == 2
                                ? {
                                    backgroundColor: "#F6B100",
                                  }
                                : {
                                    backgroundColor: "#f1f0f2",
                                  }
                            }
                          >
                            3
                          </span>
                          <span className="bs-stepper-label">
                            <span className="bs-stepper-title">
                              {t("uploaded_documents")}
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="bs-stepper-content">
                      <form>
                        {stepper === 0 && (
                          <AccountForm handleStepper={handleStepper} />
                        )}
                        {stepper === 1 && (
                          <BusinessForm
                            handleStepper={handleStepper}
                            hydrated={hydrated}
                          />
                        )}
                        {stepper === 2 && (
                          <BusinessDocumentsForm
                            handleStepper={handleStepper}
                            hydrated={hydrated}
                          />
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
      <div className="drag-target"></div>
      {showModal && (
        <UploadedModal
          showModal={showModal}
          handleModal={handleModal}
          src={imageUrl}
          name={fileName}
        />
      )}
      {ChangeRequestBox(modelToggle, handelInitaeChange)}
    </div>
  );
}
import { getStaticProps } from "../pages/index";
import { urls } from "@/common/apis/urls";
export { getStaticProps };
