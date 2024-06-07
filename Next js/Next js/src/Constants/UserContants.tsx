import { getFromLocalStorage } from "@/utils/Helper";

// export const PlayxchipUser = localStorage.getItem("isUserLoginToken")
export const PlayxchipUser = getFromLocalStorage("isUserLoginToken")