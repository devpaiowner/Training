import React from "react";
import { useTranslation } from "react-i18next";

export default function MicroLineOfCredit() {
    const { t } = useTranslation("common");
    return (
        <div className="credit-points my-5">
            <h5 className="text-black">{t("micro_line_of_credit")}</h5>
            <ul className="d-flex flex-wrap justify-content-between">
                <li>
                    <i className="sq-icon icon-mins"></i>
                    {t("apply_in_less_than")}
                </li>
                <li>
                    <i className="sq-icon icon-approval"></i>
                    {t("quick_approval_and_disbursements")}
                </li>
                <li>
                    <i className="sq-icon icon-application"></i>
                    {t("no_unnecessary_application_fee")}
                </li>
            </ul>
        </div>
    );
}
