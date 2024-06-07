import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Cookie from "js-cookie";
import nextI18NextConfig from "../../next-i18next.config.js";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import slugify from "slugify";
import AppContext from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import WebSocketComponent from "@/common/utils/webSocket";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/bs-stepper.css";
import "@/styles/globals.css";
import "@/styles/app-chat.css";
import "@/styles/tabler-icons.css";
import "@/styles/developer.css";
import "@/styles/icomoon.css";
import "react-phone-number-input/style.css";
import { ReadyState } from "react-use-websocket";
if (Cookie.get("theme") === "dark") {
  if (typeof window !== "undefined") {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${process.env.NEXT_PUBLIC_BASEPATH}/css/theme-default-dark.css`;
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${process.env.NEXT_PUBLIC_BASEPATH}/css/core-dark.css`;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  }
} else {
  if (typeof window !== "undefined") {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${process.env.NEXT_PUBLIC_BASEPATH}/css/core.css`;
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `${process.env.NEXT_PUBLIC_BASEPATH}/css/theme-default.css`;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const _authUser = Cookie.get("authUser");
  const authUser = _authUser ? JSON.parse(_authUser) : _authUser;
  const [appData] = useState({
    _socketClient: slugify(String(authUser?.username), {
      remove: /[*+~.()@'"!:@]/g,
      lower: true,
      replacement: "",
    }),
  });
  const [hasSetAuthUser, setHasSetAuthUser] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  const { socketStatus, authUserStatus } = storeData;

  const apis = new Api(
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_HOST
      : process.env.NEXT_PUBLIC_API_HOST,
    appData._socketClient,
    Cookie.get("token") ?? ""
  );

  const fetchAuthUser = async () => {
    const res = await apis.fetchAuthUser({});
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "authUserStatus" });
    } else {
    }
  };

  useEffect(() => {
    setStoreData({ sCredToggle: false });
    setStoreData({ sbusinessToggle: false });
  }, []);

  useEffect(() => {
    setStoreData({ PurchaseToggle: false });
    if (socketStatus === ReadyState.OPEN && !hasSetAuthUser) {
      setHasSetAuthUser(true);
      fetchAuthUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  useEffect(() => {
    if (authUserStatus?.["statusCode"] === 200) {
      setStoreData({
        myProfile: authUserStatus?.["data"],
        avatar: authUserStatus?.["data"]?.avatar,
      });
    } else if (authUserStatus?.["statusCode"] !== 200)
      return () => {
        setStoreData({
          authUserStatus: undefined,
        });
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserStatus]);

  const refList = {
    business_name: useRef(),
    business_address: useRef(),
    tin_number: useRef(),
    bs_country: useRef(),
    auth_representative_name: useRef(),
    auth_reps_role: useRef(),
    certi_regis: useRef(),
    tax_clearance: useRef(),
    incorporation: useRef(),
    director: useRef(),
    upload_tin: useRef(),
    upload_licence: useRef(),
    first_name: useRef(),
    last_name: useRef(),
    nationality: useRef(),
    role: useRef(),
    business_sector: useRef(),
    email: useRef(),
    mobile: useRef(),
  };

  return (
    <AppContext.Provider value={{ appData, apis, refList }}>
      <NextNProgress options={{ showSpinner: false }} color="#08485ca6" />
      <WebSocketComponent socketClient={appData._socketClient} />
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </AppContext.Provider>
  );
}
export default appWithTranslation(App, nextI18NextConfig);
