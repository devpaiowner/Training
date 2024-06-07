import { checkScreen, getFromLocalStorage } from "@/utils/Helper";

export const url = "";

export const PLAYXCHIP_APP_API_BASE_URL = "https://ag.stg.playxchip.live/api/"
export const PLAYXCHIP_SOCKET_BASE_URL = "https://stg.callbackgames.com"

export const PLAYXCHIP_DEFAULT_IMAGE_URL = "images/updatelogo.png"
export const PLAYXCHIP_LOGO = "images/logo2.jpeg"
export const PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL = "images/updatelogo_default.png"
export const PLAYXCHIP_LOADER_IMAGE = "images/logoloader.gif"

export const isUserLoggedIn = () => {
    if (typeof window !== 'undefined') {
        return Boolean(getFromLocalStorage('isUserLoginToken'));
    }
    return false;
}

export const APP_NAME = ''
export const APP_DEVELOPED_BY = ''

const d = new Date();
let year = d.getFullYear();
export const CopyRightYear = year

export const isSmallScreen = checkScreen(1024);