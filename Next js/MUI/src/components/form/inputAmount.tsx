import { CURRENCY_TYPE } from "@/common/utils/constant";
import React from "react";
import CurrencyInput from "react-currency-input-field";
interface IProps {
    value?: string;
}
export default function InputAmount(props: IProps) {
    return (
        <CurrencyInput
            value={props?.value}
            decimalsLimit={2}
            prefix={CURRENCY_TYPE + " "}
            style={{ border: "0px", textAlign: "center" }}
        />
    );
}
