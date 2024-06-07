import React from "react";
import htmlParse from "html-react-parser";
import { LOAN_DOCS } from "@/common/utils/constant";
import InputFile from "@/components/form/inputFile";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };
interface Iprops {}
export default function KycDocumentsToBoost(props?: Iprops) {
  const { t } = useTranslation("loanForm");
  let kycBoostUpload = [
    {
      type: { LOAN_DOCS },
      name: "trading_license",
      store: "trading_license",
      title: t("permits_as_per_trade"),
    },
    {
      type: { LOAN_DOCS },
      name: "lease_agreement",
      store: "lease_agreement",
      title: t("lease_agreement"),
    },
    {
      type: { LOAN_DOCS },
      name: "title_deed",
      store: "title_deed",
      title: t("title_deed"),
    },
    {
      type: { LOAN_DOCS },
      name: "power_attorney",
      store: "power_attorney",
      title: t("power_of_attorney"),
    },
    {
      type: { LOAN_DOCS },
      name: "tbs",
      store: "tbs",
      title: t("tbs_permits"),
    },
  ];
  return (
    <>
      <h4 className="my-2 text-center text-dblue">
        {t("boost_your_application")}{" "}
      </h4>
      <p className="text-dblue wd-80 mx-auto text-center fw-semibold">
        {htmlParse(t("boost_your_financing"))}
      </p>
      <div className="mt-5 wd-60 mx-auto">
        <h5 className="text-black">
          {t("documents_upload")} <i className="ti ti-info-circle"></i>
        </h5>
        <form className="mt-2">
          {kycBoostUpload?.length > 0 &&
            kycBoostUpload?.map((item, index) => {
              return (
                <InputFile
                  key={index}
                  type={item?.type?.LOAN_DOCS}
                  name={item?.name}
                  store={item?.store}
                  title={item?.title}
                />
              );
            })}
        </form>
      </div>
    </>
  );
}
