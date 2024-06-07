import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  hydrated?: boolean;
}

export default function CredApply(props: IProps) {
  const { t } = useTranslation("common");
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h5 className="card-title text-black mb-2">
        {t("credit_request_summary")}
      </h5>
      <p>
        <Link
          href={"/apply-credit"}
          className={props?.hydrated ? "btn btn-fill" : "btn btn-fill"}
        >
          {t("apply_for_credit")}
        </Link>
        <Link
          href={"/loan-application"}
          className={
            props?.hydrated
              ? "btn btn-white brdr-ylow ms-2"
              : "btn btn-white brdr-ylow ms-2"
          }
        >
          {t("view_more")}
        </Link>
      </p>
    </div>
  );
}
