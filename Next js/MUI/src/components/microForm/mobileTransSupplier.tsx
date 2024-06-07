import React from "react";
import InputForm from "../form/inputForm";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

export default function MobileTransSupplierLayout() {
  const { t } = useTranslation("loanForm");
  let bankTransfer = [
    {
      name: "supplier_business_name",
      label: t("business_name"),
    },
    {
      name: "supplier_mobile",
      label: t("mobile"),
      phonecode: true,
    },
  ];
  return (
    <form className="mt-2">
      {bankTransfer?.map((item, index) => {
        return (
          <div
            className={
              item?.phonecode
                ? "form-label-group input-group mb-3"
                : "mb-3 form-label-group"
            }
            key={index}
          >
            <InputForm
              name={item?.name}
              placeHolder={item?.label}
              onChange={() => {
                // setDataError({ [item?.name]: undefined });
              }}
              phonecode={item?.phonecode}
            />
            <label htmlFor="floating-label1">{item?.label}</label>
          </div>
        );
      })}
    </form>
  );
}
