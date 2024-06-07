import axios from "axios";
import { toast } from "react-toastify";
import { CODE, VALIDATION_MESSAGE } from "../constants/Constants";
import { logoutHelper } from "../utils/Helper";
import { Config } from "../config/Config";

const apiinstance = axios.create({
  baseURL: Config?.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(Config?.IS_USER_LOGIN_TOKEN && { "Authorization": "Bearer " + Config?.IS_USER_LOGIN_TOKEN }),
  }
})

const apiinstanceFormData = axios.create({
  baseURL: Config?.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
    ...(Config?.IS_USER_LOGIN_TOKEN && { "Authorization": "Bearer " + Config?.IS_USER_LOGIN_TOKEN }),
  }
})

export const POSTAPI = (URL: string, params: any, toastStatus: any = true) => {
  const promise = apiinstance.post(URL, params, {
    validateStatus: status => status >= 200 && status < 600
  });
  const dataPromise = promise.then((response) => response).then((response) => {
    if (response?.status === CODE?.OK_CODE || response?.status === CODE?.CREATED) {
      if (response?.data?.status == true && toastStatus) {
        toast.success(response.data?.message)
      } else {
        toast.error(response.data?.message);
      }
      if (response?.data?.status) {
        return response.data;
      }
      else if (response?.data?.status_code === CODE?.NO_CONTENT) {
        return response?.data;
      }
      else {
        toast.error(response.data?.message);
        return response.data;
      }
    }
    else if (response?.status === CODE?.BAD_REQUEST_CODE) {
      toast.error(response.data?.message);
      return response?.data;
    }
    else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
      logoutHelper()
    }
    else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {
      toast.error(response.data?.message);
      return response?.data;

    }
    else if (response?.status === CODE?.VALIDATION_CODE) {
      toast.error(response.data?.message);
      return response?.data;

    }
    else {
      toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
    }
  }).catch((error) => {
    if (error?.response?.status === CODE?.UNAUTHORIZED_CODE) {
      logoutHelper()
    }
    toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
  });
  return dataPromise;
};

export const POSTAPIFORMDATA = (URL: string, params: any, toastStatus: any = true) => {
  const promise = apiinstanceFormData.post(URL, params, {
    validateStatus: status => status >= 200 && status < 600
  });
  const dataPromise = promise.then((response) => response).then((response) => {
    if (response?.status === CODE?.OK_CODE) {
      if (response?.data?.status === 'true' || response?.data?.status === true) {
        if (toastStatus) {
          toast.success(response.data?.message)
        }
        return response.data;
      } else {
        toast.error(response.data?.message);
        return response.data;
      }
    }
    else if (response?.status === CODE?.BAD_REQUEST_CODE) {
      toast.error(response.data?.message);
      return response?.data;
    }
    else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
      logoutHelper()
    }
    else if (response?.status === CODE?.INTERNAL_SERVER_ERROR) {
      toast.error(response.data?.message);
      return response?.data;
    }
    else if (response?.status === CODE?.VALIDATION_CODE) {
      toast.error(response.data?.message);
      return response?.data;
    }
    else {
      toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
    }
  }).catch((error) => {
    // if (error?.response?.status === CODE?.UNAUTHORIZED_CODE) {
    // logoutHelper()
    // }
    toast.error(VALIDATION_MESSAGE?.CATCH_ERROR);
  });
  return dataPromise;
};
export const GETAPI = (URL: string, params: any = {}, toastStatus: any = false) => {
  const promise = apiinstance.get(URL, params)

  const dataPromise = promise.then((response) => response).then((response) => {
    if (response?.status === 200 || response?.status === 201) {
      if (toastStatus) { toast.success(response.data?.message) }
      return response.data;
    } else if (response?.status === CODE?.UNAUTHORIZED_CODE) {
      logoutHelper()
    } else {
      toast.error(response.data?.message)
      return response?.data;
    }
  }).catch((error) => {
    if (error?.response?.status === CODE?.UNAUTHORIZED_CODE) {
      logoutHelper()
    }

  })
  return dataPromise;
}




