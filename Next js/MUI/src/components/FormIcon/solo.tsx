import React from "react";
import { useTranslation } from "react-i18next";

export default function Solo() {
    const { t } = useTranslation("loanForm");
    return (
        <>
            <span className="icon-user">
                <span className="path1 display-4"></span>
                <span className="path2 display-4"></span>
            </span>
            <p className="mt-3 mb-0">{t("solo")}</p>
        </>
    );
}
