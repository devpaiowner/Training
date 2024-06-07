/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import useStore, { IStore } from "@/common/zustand/store";
import ConsentClause from "../modalBox/consentClause";
import validation from "@/common/utils/validation";

export default function IAgreeTnC() {
    const { storeData, setStoreData, setNewError, setDataError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
            setNewError: state.setNewError,
        })
    );

    const [consentClause, setConsentClause] = useState(false);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {}
    const { t } = useTranslation("loanForm");
    const errorMessage  = useTranslation("errorMessage").t;
    return (
        <>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="yes"
                    id="t_p"
                    onChange={(e: any) => {
                        setStoreData({
                            tncAgree:
                                storeData["tncAgree"] === "yes" ? "" : "yes",
                        });
                        validation(
                            { tncAgree: e.target.value },
                            ["tncAgree"],
                            setDataError,
                            {}
                        );
                    }}
                    checked={
                        (storeData["tncAgree"] as any) === "yes" ? true : false
                    }
                />
                <label
                    className="form-check-label text-black"
                    htmlFor="flexCheckboxDefault1"
                >
                    {" "}
                    {t("i_accept_the")}{" "}
                    <span
                        className="text-ylow"
                        onClick={() => {
                            setConsentClause(true);
                        }}
                    >
                        {t("data_consent_clause")}
                    </span>{" "}
                </label>
            </div>
            {storeData?.validation?.["tncAgree"] && (
                <div
                    className="error"
                    style={{ marginTop: "-20px", position: "relative" }}
                >
                    {errorMessage(storeData?.validation?.["tncAgree"])}
                </div>
            )}
            {consentClause && (
                <ConsentClause
                    handleModel={() => {
                        setConsentClause(false);
                    }}
                />
            )}
        </>
    );
}
