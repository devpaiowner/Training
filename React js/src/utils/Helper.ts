import { Config } from "../config/Config";
import { StorageConstants } from "../constants/Constants";
import { Routes } from "../constants/RouteConstants";
import moment from "moment";
import CryptoJS from "crypto-js";


const ENCODE_SECRET_KEY_1 = '#&*BB&G*&#&*#G8754454^&*T*&GMAN&^#$$ISH883782&**78';
const ENCODE_SECRET_KEY_2 = '!@#$%^&*()UJCFFGS4548MAN/*+5+5as8as7d6t7ISH&^*^&^*';

export const saveToStorage = ({ key, value, type = 'local', isSecure = true }: {
    key: string,
    value: any,
    type?: string,
    isSecure?: boolean
}) => {
    let newValue = JSON.stringify(value);
    if (isSecure) {
        newValue = encodeData(newValue);
    }
    if (type === 'local') {
        localStorage.setItem(key, newValue);
    } else if (type === 'session') {
        sessionStorage.setItem(key, newValue);
    }
};

export const getFromStorage = ({ key, type = 'local', isSecure = true }: {
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

export const deleteFromStorage = ({ key, type = 'local' }: {
    key: string,
    type?: string
}) => {
    if (type === 'local') {
        if (key) {
            localStorage.removeItem(key)
        } else {
            localStorage.clear()
        }
    } else if (type === 'session') {
        if (key) {
            localStorage.removeItem(key)
        } else {
            localStorage.clear()
        }
    }
};

export const getSearchQueryParams = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get(key);
    return value;
}


export const renderFormData = (values: any) => {
    var formData = new FormData();
    Object.keys(values).map(function (key) {
        formData.append(key, values[key])
    });
    return formData
}

export const logoutHelper = () => {
    deleteFromStorage({ key: StorageConstants?.IS_USER_LOGIN_TOKEN });
    deleteFromStorage({ key: StorageConstants?.USER_DETAIL });
    window.location.href = Routes?.Home;
}

export const hideEmail = (email: string) => {
    if (email) {
        const [emailName, emailDomain] = email.split('@');
        const hiddenEmail = '●●●●●●@' + emailDomain;
        return hiddenEmail;

        // const [emailName, emailDomain] = email.split('@');
        // const hiddenLocalPart = emailName.slice(0, emailName?.length > 3 ? 3 : 1);
        // const hiddenEmail = hiddenLocalPart + '***' + '@' + emailDomain;
        // return hiddenEmail;
    }
}



export const reverseTimerHelper = (time: any, callback: any) => {
    const intervalId = setInterval(() => {
        time--;
        if (time <= 0) {
            clearInterval(intervalId);
        }
        callback(time);
    }, 1000);
    return intervalId;
};

export const appendToArray = ({ array, value, key }: any) => {
    if (key !== undefined) {
        return { ...array, [key]: [...array[key], value] };
    } else {
        return [...array, value];
    }
}
export const removeFromArray = ({ array, value, key }: any) => {
    if (key !== undefined) {
        return { ...array, [key]: array[key].filter((item: any) => item !== value) };
    } else {
        return array.filter((item: any) => item !== value);
    }
}

export const isInArray = ({ array, value }: any) => {
    return array.includes(value);
}



export const appendToKeyInObject = ({ obj, key, value }: any) => {
    obj((prevData: any) => {
        return {
            ...prevData,
            [key]: value
        };
    })
};

export const setDateHelper = ({ date, format = 'MM/DD/YYYY', type }: any) => {
    let formatDate = '';
    if (date && moment(date, format, true).isValid()) {
        formatDate = moment(date).format(format);
    }
    return formatDate;
}
export const getDateHelper = ({ date, format = 'MM/DD/YYYY', type }: any) => {
    let formatDate = '';
    if (date) {
        formatDate = moment(date).format(format);
    }
    return formatDate;
}

export const fetchAddressFromCoordinates = async (latitude: any, longitude: any) => {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config?.GOOGLE_MAP_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const address = data.results[0].formatted_address;
            return address;
        } else {
            console.error('Geocoding request failed:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
};

export const appendToString = ({ string, value }: any) => {
    return `${string},${value}`.trim();
}

export const removeFromString = ({ string, value }: any) => {
    const stringWithComma = `,${value}`;
    const stringWithoutComma = string.replace(stringWithComma, '');
    return stringWithoutComma.trim();

    // return string.replace(String(value), '').trim();
}

export const encodeData = (value: any) => {
    if (value != null && value != undefined && value != 'undefined') {
        const encryptedData4 = CryptoJS.AES.encrypt(value.toString(), ENCODE_SECRET_KEY_1).toString();
        const encryptedDataMain: any = CryptoJS.AES.encrypt(encryptedData4.toString(), ENCODE_SECRET_KEY_2).toString();
        return encryptedDataMain?.replaceAll("/", "Enc@de");
    } else {
        return value;
    }
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


export const getLocationAddress = async ({ type, latitude, longitude }: any) => {
    if (type === 'current') {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const geocoder = new window.google.maps.Geocoder();
                        const latLng = new window.google.maps.LatLng(latitude, longitude);
                        geocoder.geocode({ location: latLng }, (results: any, status) => {
                            if (status === 'OK') {
                                if (results[0]) {
                                    resolve({ latitude, longitude, address: results[0].formatted_address });
                                } else {
                                    reject(new Error('No results found'));
                                }
                            } else {
                                reject(new Error(`Geocoder failed due to: ${status}`));
                            }
                        });
                    },
                    (error: any) => {
                        reject(new Error('Error getting current location:', error));
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            const geocoder = new window.google.maps.Geocoder();
            const latLng = new window.google.maps.LatLng(latitude, longitude);
            geocoder.geocode({ location: latLng }, (results: any, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        resolve({ latitude, longitude, address: results[0].formatted_address });
                    } else {
                        reject(new Error('No results found'));
                    }
                } else {
                    reject(new Error(`Geocoder failed due to: ${status}`));
                }
            });
        })
    }
};


export const showImage = (imagePath: string) => {
    return Config?.IMAGE_BASE_URL + imagePath
}

export const pluck = (array: string[] | object[], key: any) => {
    if (array?.length > 0) {
        return array.map((arr: any) => arr[key]);
    } else {
        return array;
    }
}

export const arrayToString = (array: string[] | object[]) => {
    return array.join(',')
}

export const profileVerify = () => {

}


export const isJson = (str: any) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



export const getCurrentDateHelper = (format: any = 'MM/DD/YYYY') => {
    let formatDate = moment().format(format);
    return moment(formatDate, format).toDate();
}
