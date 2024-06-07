import React from "react";
import InputForm from "../form/inputForm";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";

export default function BankTransLayout() {
    const { t } = useTranslation("loanForm");
    let bankTransfer = [
        {
            name: "account_name",
            label: t("account_name"),
        },
        {
            name: "account_number",
            label: t("account_number"),
        },
        {
            name: "bank_name",
            label: t("bank_name"),
        },
        {
            name: "bank_branch_code",
            label: t("bank_branch_code"),
        },
    ];
    const { storeData, setStoreData, setDataError, setNewError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
            setNewError: state.setNewError,
        })
    );
    return (
        <form className="mt-2 row bank-form">
            {bankTransfer?.map((item, index) => {
                return (
                    <div className="col-sm-6 form-label-group" key={index}>
                        <InputForm
                            name={item?.name}
                            placeHolder={item?.label}
                            id={`floating-label${index + 185}`}
                            class={"form-control mb-4"}
                            onChange={() => {
                                setDataError({ [item?.name]: "" });
                            }}
                        />
                        <label htmlFor={`floating-label${index + 1}`}>
                            {item?.label}
                        </label>
                    </div>
                );
            })}
        </form>
    );
}
