import React, { useContext, useEffect, useState } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";

export default function RepaymentTerms() {
    const {t} = useTranslation("loanForm");
    const refList = useContext(appContext).refList;
    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));
    return (
       
            <div className="mt-5 wd-40 mx-auto">
                <h5 className="text-black">
                    {t("should_know_repayment_terms")}
                </h5>
                <ul className="chk-list">
                    <li>
                        {t("consider_inventory_cycle")}
                    </li>
                    <li>
                        {t("shorter_net_terms")}
                    </li>
                    <li>
                        {t("early_repayment")}
                    </li>
                    <li>{t("pay_on_time_to_score")}</li>
                </ul>
            </div>
        
    );
}
