import React from "react";
import { useTranslation } from "react-i18next";
import HtmlParse from "html-react-parser";

export default function DomesticManufacture() {
    const {t} = useTranslation("loanForm");
    return (
        <>
            <span className="icon-domestic">
                <span className="path1"></span>
                <span className="path2"></span>
            </span>
            <p className="mt-3 mb-0">
                {HtmlParse(t("domestic_manufacturer"))}
            </p>
        </>
    );
}
