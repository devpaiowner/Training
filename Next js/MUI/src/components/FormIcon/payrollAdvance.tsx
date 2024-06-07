import React from "react";
import { useTranslation } from "react-i18next";

export default function PayrollAdvance() {
const {t} = useTranslation("loanForm");
    return (
        <>
            <span className="icon-payroll">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
            </span>
            <p className="mt-3 mb-0">{t("payroll_advance")}</p>
        </>
    );
}
