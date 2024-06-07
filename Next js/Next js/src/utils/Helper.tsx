// import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';



export const setCookie = (key: any, value: any, exdays: any) => {
  // Cookies.set(key, value, { expires: exdays })

  // if (typeof document !== 'undefined') {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //   let expires = "expires=" + d.toUTCString();
  //   document.cookie = key + "=" + value + ";" + expires + ";path=/";
  // }
}


export const getCookie = (key: any) => {
  // Cookies.get(key)

  // if (typeof document !== "undefined") {
  //   let name = key + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }
}


export const renderFormData = (values: any) => {
  var formData = new FormData();
  Object.keys(values).map(function (key, index) {
    formData.append(key, values[key])
  });
  return formData
}

const secretKey = 'P@WcQfTjWnZr4u7x!A%D*G-HaNdRgUkX';
const secretKey2 = 'A@NcQfTjPaIOwnErx!A%D*G-LaNdRgUkX';

// export const encodeID = (id: any) => {
//   if (id != null) {
//     const encryptedData = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
//     const encryptedData2 = CryptoJS.AES.encrypt(encryptedData.toString(), secretKey2).toString();
//     const encryptedData3 = CryptoJS.AES.encrypt(encryptedData2.toString(), secretKey3).toString();
//     const encryptedData4 = CryptoJS.AES.encrypt(encryptedData3.toString(), secretKey4).toString();
//     const encryptedDataMain = CryptoJS.AES.encrypt(encryptedData4.toString(), secretKey5).toString();
//     return encryptedDataMain?.replaceAll("/", "Pai");
//   } else {
//     return id;

//   }
// }

// export const decodeID = (id: any) => {
//   if (id != null) {
//     const replaceddata: any = id?.replaceAll("Pai", "/");
//     const decryptedData = CryptoJS.AES.decrypt(replaceddata.toString(), secretKey5).toString(CryptoJS.enc.Utf8);
//     const decryptedData1 = CryptoJS.AES.decrypt(decryptedData.toString(), secretKey4).toString(CryptoJS.enc.Utf8);
//     const decryptedData2 = CryptoJS.AES.decrypt(decryptedData1.toString(), secretKey3).toString(CryptoJS.enc.Utf8);
//     const decryptedData3 = CryptoJS.AES.decrypt(decryptedData2.toString(), secretKey2).toString(CryptoJS.enc.Utf8);
//     const decryptedDataMain = CryptoJS.AES.decrypt(decryptedData3.toString(), secretKey).toString(CryptoJS.enc.Utf8);
//     return decryptedDataMain;
//   } else {
//     return id;
//   }
// }

export const encodeID = (id: any) => {
  try {
    const encryptedData = AES.encrypt(id.toString(), secretKey).toString();
    const encryptedData2 = AES.encrypt(encryptedData.toString(), secretKey2).toString();

    return encodeURIComponent(encryptedData2.toString())

  } catch (error: any) {
    // console.error("Encryption error:", error?.message);
    return null;
  }
};

export const decodeID = (encryptedID: any) => {
  try {
    const decryptedData = decodeURIComponent(encryptedID);
    const decryptedData5 = AES.decrypt(decryptedData, secretKey2).toString(enc.Utf8)
    const decryptedDataMain = AES.decrypt(decryptedData5, secretKey).toString(enc.Utf8)
    return decryptedDataMain

  } catch (error: any) {
    // console.error("Encryption error:", error?.message);
    return null;
  }
};

export const imageUrl = (image: any, type: any = null) => {
  let URL;
  if (type === 'custom') {
    URL = image.replace("gstatic/", "");
  } else {
    const path = image ? image.split('gstatic') : ""
    URL = `https://agstatic.com${path[1]}`
  }
  return URL;
}

export const ServerImageUrl = (image: any) => {
  let URL = `https://storage.googleapis.com/${image}`
  return URL;
}


export const getLastURL = (location: any) => {
  let lastURL = location && location.pathname && location.pathname.split('/') && location.pathname.split('/').pop();
  return lastURL;
}

export const getSecondLastURL = (location: any) => {
  let lastURL = location && location.pathname && location.pathname.split('/') && location.pathname.split('/')[2];
  return lastURL;
}

export const getplayerSecondLastURL = (location: any) => {
  let lastURL = location && location.pathname && location.pathname.split('/') && location.pathname.split('/')[1];
  return lastURL;
}

export const paginationQuery = (limit: any, page: any, search: any) => {
  let query: any;
  let newpage: any = ""
  if (search != "") {
    newpage = 1
  } else {
    newpage = page
  }

  query = {
    page_size: limit,
    page: newpage,
    search: search?.length > 2 ? search : "",
    status: true,
  }

  return query;
}


export const isNotEmpty = (data: any) => {
  if (data !== '' && data !== null && data !== undefined) {
    return true
  } else {
    return false
  }
}

export const isEmpty = (data: any) => {
  if (data == ' ' && data == null && data == undefined && data == 0) {
    return true
  } else {
    return false
  }
}

export const isJson = (str: any) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


export const getFirstLetter = (data: any) => {
  if (data !== '' && data !== null && data !== undefined) {
    const firstLetter = data.charAt(0);
    return firstLetter;
  }
}

export const saveToLocalStorage = (key: any, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
  }
}

export const removeFromLocalStorage = (key: any) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

export const getFromLocalStorage = (key: any) => {
  if (typeof window !== 'undefined') {
    let value: any = localStorage.getItem(key)
    return value;
  }
}

export const saveToSessionStorage = (key: any, value: any) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value)
  }
}

export const removeFromSessionStorage = (key: any) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key)
  }
}

export const getFromSessionStorage = (key: any) => {
  if (typeof window !== 'undefined') {
    let value = sessionStorage.getItem(key)
    return value;
  }
}

export const generatePaymentData = (upi: any, name: any, amount: any) => {
  const QRChange = `upi://pay?pa=${upi}&pn=${name}&am=${amount}`
  return QRChange
}

export function formatDateToCustomUTC(date: any) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getUTCDay()];
  const monthName = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${dayName}, ${monthName} ${dayOfMonth}, ${hours}:${minutes} (UTC)`;
}


export function formatDateToCustomIST(date: any) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

  const dayName = days[istDate.getUTCDay()];
  const monthName = months[istDate.getUTCMonth()];
  const dayOfMonth = istDate.getUTCDate();
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');

  return `${dayName}, ${monthName} ${dayOfMonth}, ${hours}:${minutes} (IST)`;
}

export const formatDate = (dateString: any) => {
  const options: any = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
    // hour12:false
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
}


export const checkScreen = (width = 1024) => {
  if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const screenThreshold = width + 1;
      return screenWidth < screenThreshold;
  }
}
