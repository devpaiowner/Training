import React from "react";
import PartnerShip from "@/components/FormIcon/partnerShip";
import Solo from "@/components/FormIcon/solo";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import useStore, { IStore } from "@/common/zustand/store";
import InputForm from "@/components/form/inputForm";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

export default function ApplySoloOrPartner() {
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );

  let patrnerShip = [
    { name: "partner_full_name", label: t("full_name") },
    { name: "partner_email", label: t("email") },
    {
      name: "partner_mobile",
      label: t("mobile"),
      phonecode: true,
      class: true,
    },
  ];
  return (
    <>
      <h4 className="mt-2 mb-0 text-center text-dblue">
        {t("you_applying_solo_partnership")}
      </h4>
      <p className="mb-4 text-dblue text-center">
        {t("selecting_multiple_partners")}
      </p>
      <div className="wd-40 mx-auto">
        <div className="d-flex flex-wrap justify-content-center choose-credit crdit-2">
          <div className="credit">
            <RadioSelectionForm
              value="solo"
              name="partner"
              handleChange={() => {
                // setStoreData({ partner: "solo" });
                // setDataError({ partner: "" });
              }}
            />
            <Solo />
          </div>
          <div className="credit">
            <RadioSelectionForm
              value="partnership"
              name="partner"
              handleChange={() => {
                // setStoreData({ partner: "partnership" });
                // setDataError({ partner: "" });
              }}
            />
            <PartnerShip />
          </div>
        </div>

        {storeData?.validation?.["partner"] && (
          <div className="error position-relative text-center">
            {errorMessage(storeData?.validation?.["partner"])}
          </div>
        )}
        {storeData?.partner === "partnership" && (
          <div className="mt-5 mx-2">
            <h5 className="text-black">{t("details_of_one_partner")}</h5>
            <form className="align-items-center">
              {patrnerShip?.map((item) => {
                return (
                  <>
                    <div
                      className={
                        item?.class
                          ? "form-label-group input-group mb-3"
                          : "mb-3 form-label-group"
                      }
                    >
                      <InputForm
                        name={item?.name}
                        type="text"
                        id="floating-label5"
                        placeHolder={item?.label}
                        phonecode={item?.phonecode}
                        onChange={() => {}}
                      />
                      <label htmlFor="floating-label5">{item?.label}</label>
                    </div>
                  </>
                );
              })}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
