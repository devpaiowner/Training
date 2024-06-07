import React from "react";
import { useTranslation } from "react-i18next";
export default function RevolvingLineOfCredit() {
    const { t } = useTranslation("common");
    return (
        <div className="credit-points my-5">
            <h5 className="text-black">{t("revolving_line_of_credit")}</h5>
            <ul className="row">
                <li className="col-sm-6 ps-0">
                    <i className="sq-icon icon-mins"></i>
                    <span>{t("active_po_to_be_financed")} </span>
                </li>
                <li className="col-sm-6">
                    <i className="sq-icon icon-approval"></i>
                    <span>{t("loan_amount_between_approval")} </span>{" "}
                </li>
                <li className="col-sm-6 ps-0">
                    <i className="sq-icon icon-approval"></i>
                    <span> {t("flexible_tenor")} </span>{" "}
                </li>
                <li className="col-sm-6">
                    <i className="sq-icon icon-application"></i>
                    <span>{t("full_transparency_on_rates")} </span>
                </li>
            </ul>
        </div>
    );
}
