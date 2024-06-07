import React from "react";
import InputForm from "../form/inputForm";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { getStaticProps } from "@/pages";
export { getStaticProps };
export default function MobileTransLayout() {
  const { t } = useTranslation("loanForm");
  const inputFields = [
    {
      name: "account_name",
      label: t("business_name"),
    },
    {
      name: "mobile",
      label: t("Enter Mobile Number"),
      phonecode: true,
      class: "form-label-group mb-3 input-group",
    },
  ];
  return (
    <form className="mt-2">
      {inputFields?.map((item, index) => {
        return (
          <div
            className={item?.class ? item?.class : "form-label-group mb-3"}
            key={index}
          >
            <InputForm
              name={item?.name}
              placeHolder={item?.label}
              phonecode={item?.phonecode}
              onChange={() => {
                // setDataError({ [item?.name]: undefined });
              }}
            />
            <label htmlFor="floating-label1">{item?.label}</label>
          </div>
        );
      })}
    </form>
  );
}
