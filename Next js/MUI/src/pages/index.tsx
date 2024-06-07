import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return <Dashboard />;
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
