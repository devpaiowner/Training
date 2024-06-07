import React from "react";
import { useTranslation } from "react-i18next";

export default function EmergencyExp() {
    const {t}=useTranslation("loanForm");
    return (
        <>
            <span className="icon-emergency">
                <span className="path1"></span>
                <span className="path2"></span>
            </span>
            <p className="mt-3 mb-0">{t("emergency_expenses")}</p>
        </>
    );
}
