import React from "react";
import { useTranslation } from "react-i18next";

export default function MoreCredit() {
    const { t } = useTranslation("common");
    return (
        <>
            <span className="icon-more-credit">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
                <span className="path7"></span>
            </span>
            <p className="mt-3 mb-0 text-black">{t("more_than_million")}</p>
        </>
    );
}
