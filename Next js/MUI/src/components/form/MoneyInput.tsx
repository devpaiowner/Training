import React from "react";
import { CURRENCY_TYPE } from "@/common/utils/constant";
import CurrencyInput from "react-currency-input-field";

interface Iprops {
  data?: string;
  textAlign?: string;
  class?: string;
}

export default function AmountInput(props: Iprops) {
  return (
    <CurrencyInput
      value={Number(props?.data).toFixed(2)}
      prefix={CURRENCY_TYPE + " "}
      style={
        props?.textAlign
          ? { border: "0px", textAlign: "right" }
          : { border: "0px" }
      }
      decimalsLimit={1}
      className={props?.class ? props?.class : "viewamount"}
    />
  );
}
