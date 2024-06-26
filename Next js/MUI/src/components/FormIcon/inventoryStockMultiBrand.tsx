import React from "react";
import { useTranslation } from "react-i18next";

export default function InventoryStockMultiBrand() {
    const { t } = useTranslation("loanForm");
    return (
        <>
            <span className="icon-inventory">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
            </span>
            <span className="icon-inventory">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
            </span>
            <p className="mt-3 mb-0">{t("inventory_stock_multiple_brand")}</p>
        </>
    );
}
