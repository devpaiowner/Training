import { FILE_ACCEPT, KYC_DOCS } from "@/common/utils/constant";
import React from "react";
import OtherKycDocuments from "../form/otherKycDocument";
import { useTranslation } from "react-i18next";

export default function OtherDocuments() {
  const { t } = useTranslation("profile");
  let otherDocs = [
    {
      name: "otherDoc1",
      id: "otherDoc1",
      type: KYC_DOCS,
      store: "otherDoc1",
    },
    {
      name: "otherDoc2",
      id: "otherDoc2",
      type: KYC_DOCS,
      store: "otherDoc2",
    },
    {
      name: "otherDoc3",
      id: "otherDoc3",
      type: KYC_DOCS,
      store: "otherDoc3",
    },
  ];
  return (
    <div className="col-md-6">
      <div className="form-group form_box">
        <h6 className="mb-0">{t("other_documents")}</h6>
        <div className="other_D">
          {otherDocs?.map((item, index) => {
            return (
              <OtherKycDocuments
                key={index}
                type={item?.type}
                name={item?.name}
                store={item?.store}
                id={item?.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
