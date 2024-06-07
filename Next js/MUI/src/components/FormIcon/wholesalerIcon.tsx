import React from "react";
import { useTranslation } from "react-i18next";

export default function WholesalerIcon() {
    const {t} = useTranslation("loanForm");
    return (
        <>
            <span className="icon-wholeseller">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
                <span className="path7"></span>
                <span className="path8"></span>
                <span className="path9"></span>
                <span className="path10"></span>
                <span className="path11"></span>
            </span>
            <p className="mt-3 mb-0">{t("wholesaler")}</p>
        </>
    );
}
