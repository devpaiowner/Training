import React from "react";
import InputForm from "../form/inputForm";
import { useTranslation } from "react-i18next";

export default function BankTransSupplierLayout() {
    const {t} = useTranslation("loanForm");
    let bankTransfer = [
        {
            name: "supplier_account_name",
            label: t("account_name"),
        },
        {
            name: "supplier_account_number",
            label: t("account_number"),
        },
        {
            name: "supplier_bank_name",
            label: t("bank_name"),
        },
        {
            name: "supplier_bank_branch_code",
            label: t("bank_branch_code"),
        },
    ];
    return (
        <form className="mt-2 row bank-form">
            {bankTransfer?.map((item, index) => {
                return (
                    <div className="col-sm-6 form-label-group" key={index}>
                        <InputForm
                            name={item?.name}
                            placeHolder={item?.label}
                            id={`floating-label${index + 1}`}
                            class={"form-control mb-3"}
                            onChange={() => {
                                // setDataError({ [item?.name]: undefined });
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
