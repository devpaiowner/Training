import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import CreditViewApplication from "@/components/layout/creditViewApplication";
import IAgreeTnC from "@/components/form/iagreeCheckbox";
import htmlParse from "html-react-parser";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function ReviewLoanApplication(props?: Iprops) {
  const { t } = useTranslation("loanForm");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="ribon">
        {router?.pathname === "/revolving-form" ? (
          <>{htmlParse(t("revolving_more_than"))}</>
        ) : (
          <>{htmlParse(t("micro_less_than"))}</>
        )}
      </div>
      <h4 className="my-2 text-dblue">{t("credit_request_application")}</h4>
      <p className="text-dblue">{t("review_and_ensure")}</p>
      <form className="row mt-2">
        <CreditViewApplication />
      </form>
      <hr className="my-xl-4" />
      <div className="col-sm-12 mt-3">
        <IAgreeTnC />
      </div>
    </>
  );
}
