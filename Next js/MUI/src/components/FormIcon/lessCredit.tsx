import React from "react";
import { useTranslation } from "react-i18next";

export default function LessCredit() {
    const { t } = useTranslation("common");
    return (
        <>
            <span className="icon-less-credit">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
            </span>
            <p className="mt-3 mb-0">{t("less_than_million")}</p>
        </>
    );
}
