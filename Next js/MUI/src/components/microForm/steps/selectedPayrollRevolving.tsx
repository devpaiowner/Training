import MultipleUpload from "@/components/microForm/MultipleUpload";
import React from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

export default function SelectedPayrollRevolving() {
  const { t } = useTranslation("loanForm");
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );
  return (
    <>
      <h4 className="mt-2 text-center text-dblue">
        {t("because_you_selected")}{" "}
        <em className="fw-normal">
          {storeData?.purpose === "Inventory stock for one brand"
            ? t("inventory_one_brand")
            : t("inventory_multiple_brand")}
        </em>
      </h4>
      <div className="mt-3 wd-60 mx-auto">
        <MultipleUpload />
      </div>
    </>
  );
}
