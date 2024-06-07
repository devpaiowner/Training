import { StorageConstants, UserRoleTypes, UserRoles } from "../constants/Constants";
// import { getFromStorage } from "../utils/Helper";
import CryptoJS from "crypto-js";

const ENCODE_SECRET_KEY_1 = '#&*BB&G*&#&*#G8754454^&*T*&GMAN&^#$$ISH883782&**78';
const ENCODE_SECRET_KEY_2 = '!@#$%^&*()UJCFFGS4548MAN/*+5+5as8as7d6t7ISH&^*^&^*';

export const isJson = (str: any) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const decodeData = (value: any) => {
    if (value != null && value != undefined && value != 'undefined') {
        const replaceddata: any = value?.replaceAll("Enc@de", "/");
        const decryptedData = CryptoJS.AES.decrypt(replaceddata.toString(), ENCODE_SECRET_KEY_2).toString(CryptoJS.enc.Utf8);
        const decryptedData1 = CryptoJS.AES.decrypt(decryptedData.toString(), ENCODE_SECRET_KEY_1).toString(CryptoJS.enc.Utf8);
        return decryptedData1;
    } else {
        return value;
    }
}

 const getFromStorage = ({ key, type = 'local', isSecure = true }: {
    key: string,
    type?: string,
    isSecure?: boolean,
}) => {
    let value: any = null;
    if (type === 'local') {
        value = localStorage.getItem(key)
    } else if (type === 'session') {
        value = sessionStorage.getItem(key)
    }
    if (isSecure) {
        value = decodeData(value);
    }
    return isJson(value) ? JSON.parse(value) : value;
};


export const Config = {
    url: '',
    REACT_APP_API_BASE_URL: 'https://demo.dev9server.com/dais/api/',
    IS_USER_LOGIN_TOKEN: getFromStorage({ key: StorageConstants?.IS_USER_LOGIN_TOKEN }),
    ACTIVE_ROLE: getFromStorage({ key: 'role' }) || UserRoleTypes?.Rider,
    GOOGLE_MAP_API_KEY: 'AIzaSyAXixh8KRY9rjm6Y6EPX48BqXXd8a9Rml4',
    ENCODE_SECRET_KEY_1: '#&*BB&G*&#&*#G8754454^&*T*&GMAN&^#$$ISH883782&**78',
    ENCODE_SECRET_KEY_2: '!@#$%^&*()UJCFFGS4548MAN/*+5+5as8as7d6t7ISH&^*^&^*',
    // GOOGLE_CLIENT_ID: '548587511179-j4qcsn54gbsdp7p8eaeoornf0t53qp79.apps.googleusercontent.com',
    GOOGLE_CLIENT_ID: '879972649909-2b2jge9j1r5pvsr5275hg24lc61ualvc.apps.googleusercontent.com', //MM
    FACEBOOK_SOCIAL_LOGIN_APP_ID: '641088710888267',
    FACEBOOK_SOCIAL_LOGIN_APP_SECRET: '3511c97b5116ce2cb5eac92b2d869421',
    USER_DETAILS: getFromStorage({ key: StorageConstants?.USER_DETAIL }),
    IMAGE_BASE_URL: 'https://demo.dev9server.com/dais',
};