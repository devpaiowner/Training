import React from "react";
import { useTranslation } from "react-i18next";

export default function BankTransfer() {
    const {t} = useTranslation("loanForm");
    return (
        <>
            <span className="icon-bank">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
                <span className="path7"></span>
                <span className="path8"></span>
            </span>
            <p className="mt-3 mb-0">{t("bank_transfer")}</p>
        </>
    );
}
