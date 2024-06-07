import InputForm from "@/components/form/inputForm";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { toast } from "react-toastify";
import { urls } from "@/common/apis/urls";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function YourSupplierDetails(props?: Iprops) {
  const { t } = useTranslation("loanForm");
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { emailStatus } = storeData;
  let supplierDetails = [
    {
      name: "supplier_tin",
      label: t("tin"),
    },
    {
      name: "supplier_email",
      label: t("email"),
    },
    {
      name: "supplier_business_name",
      label: t("business_name"),
    },
    {
      name: "supplier_address",
      label: t("business_address"),
    },
    {
      name: "supplier_director_name",
      label: t("director_name"),
    },

    {
      name: "supplier_mobile",
      label: t("mobile"),
      phonecode: true,
    },
  ];

  const handleOnUniqueCheck = async (value: string, name: string) => {
    if (["supplier_email", "supplier_tin"].includes(name)) {
      const res = await apis.apiClient(
        `${urls.crm.Contact}?${name.replace("supplier_", "")}=${value}` //&contact_type=supplier
      );
      if (res.statusCode === 200) {
        setStoreData({ [res?.["traceId"]]: "emailStatus" });
      } else {
      }
    }
  };

  useEffect(() => {
    if (emailStatus?.["statusCode"] === 200 && emailStatus?.["data"]) {
      const contact = emailStatus?.["data"].results[0];
      if (contact) {
        setStoreData({
          supplier_business_name: contact.business_name,
          supplier_tin: contact.tin,
          supplier_email: contact.email,
          supplier_address: contact.address?.properties?.street ?? "",
          supplier_mobile: contact.mobile,
          supplier_director_name: [contact.first_name, contact.last_name]
            .filter((i) => i)
            .join(" "),
        });
        setDataError({
          supplier_business_name: "",
          supplier_address: "",
          supplier_mobile: "",
          supplier_director_name: "",
        });
        toast.success("Supplier details auto filled");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailStatus]);

  return (
    <Fragment>
      <h4 className="mt-2 mb-5 text-center text-dblue">
        {t("get_your_supplier_details")}
      </h4>
      <form className="wd-40 mx-auto">
        {supplierDetails?.map((item, index) => {
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
                id={`floating-label${index + 1}`}
                placeHolder={item?.label}
                phonecode={item?.phonecode}
                onChange={handleOnUniqueCheck}
              />
              <label htmlFor={`floating-label${index + 1}`}>
                {item?.label}
              </label>
            </div>
          );
        })}
        <h4 className="mt-2 mb-5 text-center text-dblue">
          {"Get credit from Switch, or Get credit from Supplier"}
        </h4>
        <div className="d-flex justify-content-center">
          <div className="form-check me-5">
            <RadioSelectionForm
              name="credit_provider"
              value="switch"
              class="form-check-input"
              handleChange={() => setStoreData({})}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              {"Switch"}
            </label>
          </div>
          <div className="form-check">
            <RadioSelectionForm
              name="credit_provider"
              class="form-check-input"
              value="supplier"
              handleChange={() => setStoreData({})}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              {"Supplier"}
            </label>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
