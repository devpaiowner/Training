import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";

import AddBusinessProfile from "@/components/AddBusinessProfile";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useStore, { IStore } from "@/common/zustand/store";

export default function Index() {
  const [hydrated, setHydrated] = useState(false);
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { myProfile } = storeData;
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return <AddBusinessProfile />;
}

type Props = {};
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "loanForm",
      "profile",
      "modal",
      "sidebarMenu",
      "profileMenu",
      "kycErrorMessage",
      "errorMessage",
      "addpaymentErrorMessage",
    ])),
  },
});
