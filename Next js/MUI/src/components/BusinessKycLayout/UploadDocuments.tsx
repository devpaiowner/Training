/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useState } from "react";
import UploadInputForm from "../form/uploadInputForm";
import OtherDocuments from "./OtherDocuments";
import { KYC_DOCS } from "@/common/utils/constant";
import { useTranslation } from "react-i18next";

interface IProps {
  register: any;
  errors: any;
  control: any;
  handleDocData: Function;
}
export default function UploadDocuments(props: IProps) {
  const { t } = useTranslation("profile");
  const uploadDocumentTypes = [
    {
      name: "certificate_of_incorporation",
      id: "certificate_of_incorporation",
      label: t("upload_certificate_of_incorporation") + "*",
    },
    {
      name: "bank_ststement",
      id: "bank_ststement",
      label: t("upload_vrn"),
    },
    {
      name: "certificate_of_registration",
      id: "certificate_of_registration",
      label: t("upload_certificate_of_registration") + "*",
    },
    {
      name: "tax_clearance",
      id: "tax_clearance",
      label: t("upload_tax_clearance"),
    },
    {
      name: "director_id_1",
      id: "director_id_1",
      label: t("upload_director_id_first") + "*",
      downText: t("voterid_drivinglic_passport"),
    },
    {
      name: "director_id_2",
      id: "director_id_2",
      label: t("upload_director_id_second"),
      downText: t("voterid_drivinglic_passport"),
    },
    {
      name: "tin_certificate",
      id: "tin_certificate",
      label: t("upload_tin_business") + "*",
    },
  ];
  const [BussOpened, setBussOpened] = useState(true);
  return (
    <>
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
                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/upload.svg`}
                alt=""
                className="mx-3"
              />
              <div>
                {t("documents_upload")}
                <p className="sub_head fs-6 fw-normal mb-0">
                  {t("add_your_business")}
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
                {uploadDocumentTypes?.map((item, index) => {
                  return (
                    <UploadInputForm
                      key={index + 11}
                      {...item}
                      register={props?.register}
                      errors={props?.errors}
                      control={props?.control}
                      type={KYC_DOCS}
                      handleDocData={props?.handleDocData}
                    />
                  );
                })}
                <OtherDocuments />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
