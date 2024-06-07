import React from "react";
import { useTranslation } from "react-i18next";

export default function DistributorIcon() {
    const {t} = useTranslation("loanForm");
    return (
        <>
            <span className="icon-distributor">
                <span className="path1"></span>
                <span className="path2"></span>
            </span>
            <p className="mt-3 mb-0">{t("distributor")}</p>
        </>
    );
}
