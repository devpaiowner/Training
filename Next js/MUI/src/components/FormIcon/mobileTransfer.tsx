import React from "react";
import { useTranslation } from "react-i18next";

export default function MobileTransfer() {
    const {t} = useTranslation("loanForm");
    return (
        <>
            <span className="icon-mobile">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
            </span>
            <p className="mt-3 mb-0">{t("mobile_transfer")}</p>
        </>
    );
}
