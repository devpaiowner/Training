/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import BusinessInfoInput from "../form/businessInfoInput";
import { toast } from "react-toastify";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";
import { ReadyState } from "react-use-websocket";
import InputForm from "@/components/form/inputForm";
interface IProps {
  register: any;
  errors: any;
}
export default function BusinessInfo(props: IProps) {
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
  const { socketStatus, sectorStatus } = storeData;

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
    if (sectorStatus?.["statusCode"] === 200) {
      const sectorFilter = sectorStatus["data"].results.map((item) => {
        return { value: item?.id, text: item?.name };
      });
      setStoreData({ businessSectors: sectorFilter ?? [] });
    }
  }, [sectorStatus]);

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      fetchBusinessSectors();
    }
  }, [socketStatus]);

  const BusinessInfoDoc = [
    {
      name: "business_name",
      id: "business_name",
      label: t("business_name"),
    },
    {
      noneText: t("select_your_sector"),
      name: "business_sector",
      id: "business_sector",
      type: "select",
      label: t("business_sector"),
      option: storeData?.businessSectors,
    },

    {
      name: "tin",
      type: "number",
      id: "tin",
      label: t("tin"),
    },
    {
      name: "director_name",
      id: "director_name",
      label: t("director_name"),
    },
    {
      name: "nin",
      id: "nin",
      label: t("director_nin"),
    },
    {
      name: "auth_representative_name",
      id: "auth_representative_name",
      label: t("authorized_representative_name"),
    },
    {
      name: "authorized_representative_role",
      id: "authorized_representative_role",
      label: t("authorized_representative_role"),
    },
    {
      name: "registration_year",
      id: "registration_year",
      type: "number",
      label: t("registration_year"),
    },
    {
      name: "vrn",
      id: "vrn",
      label: t("vrn"),
    },
  ];

  const addressFormFields = [
    {
      name: "address.house_no",
      placeHolder: t("address.house_no"),
    },
    {
      name: "address.street",
      placeHolder: t("address.street"),
    },
    {
      name: "address.city",
      placeHolder: t("address.city"),
    },
    {
      name: "address.state",
      placeHolder: t("address.state"),
    },
    {
      name: "address.country",
      placeHolder: t("address.country"),
    },
    {
      name: "address.post_code",
      placeHolder: t("address.post_code"),
    },
  ];
  const [BussOpened, setBussOpened] = useState(true);
  const [addressOpened, setAddressOpened] = useState(true);

  return (
    <div className="form_1 b_from">
      <div className="card-header py-0 pt-4">
        <h5 className="head_form head_b"></h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="accordion">
            <div className="accordion-item">
              <div
                onClick={() => {
                  setBussOpened(!BussOpened);
                }}
                className="accordion-header d-flex flex-row justify-content-between"
              >
                <div className="d-flex">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/sales.png`}
                    alt=""
                    className="mx-3"
                  />
                  <div>
                    {t("business_information")}
                    <p className="sub_head fs-6 fw-normal mb-0">
                      {t("please_add_business_info")}{" "}
                      <span className="red-text">
                        {t("all_fields_are_mandatory")}
                      </span>
                    </p>
                  </div>
                </div>
                {BussOpened && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/arrow-up.png`}
                    alt=""
                    className="mx-3"
                  />
                )}

                {!BussOpened && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/arrow-down.png`}
                    alt=""
                    className="mx-3"
                  />
                )}
              </div>
              {BussOpened && (
                <div className="accordion-content">
                  <div className="row">
                    {BusinessInfoDoc?.map((item, index) => {
                      return (
                        <BusinessInfoInput
                          key={index}
                          {...item}
                          register={props?.register}
                          errors={props?.errors}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="accordion">
            <div className="accordion-item">
              <div
                onClick={() => {
                  setAddressOpened(!addressOpened);
                }}
                className="accordion-header d-flex flex-row justify-content-between"
              >
                <div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/location-icon.png`}
                    alt=""
                    className="mx-3"
                  />
                  {t("address.title")}
                </div>
                {addressOpened && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/arrow-up.png`}
                    alt=""
                    className="mx-3"
                  />
                )}

                {!addressOpened && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/arrow-down.png`}
                    alt=""
                    className="mx-3"
                  />
                )}
              </div>
              {addressOpened && (
                <div className="accordion-content">
                  <div className="row">
                    {addressFormFields.map((field, index) => (
                      <div key={index} className="col-md-4">
                        <InputForm
                          type="text"
                          class="form-control"
                          {...field}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
