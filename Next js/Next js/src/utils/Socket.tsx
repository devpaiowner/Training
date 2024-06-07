import { io } from "socket.io-client";
import { PLAYXCHIP_SOCKET_BASE_URL } from "../Config/Config";
import { NOTIFICATION_UPDATE_SOCKET_SUCCESS, USER_WALLET_BALANCE_UPDATE_SUCCESS } from "@/Constants/HomeConstants";

export let socket: any = null
export let isConnectedTry = false

const SOCKETURL = PLAYXCHIP_SOCKET_BASE_URL; // Live URLs
const Socket_Url = io(SOCKETURL, { transports: ['websocket', 'polling', "webtransport"], });

// Onload Socket call
export const socketInit = async (dispatch: any) => {
  Socket_Url.on("userUpdate", (Response: any) => {
    dispatch({
      type: USER_WALLET_BALANCE_UPDATE_SUCCESS,
      data: Response
    })
  })
  Socket_Url.on("Notification", (Response: any) => {
    dispatch({
      type: NOTIFICATION_UPDATE_SOCKET_SUCCESS,
      data: Response
    })
  })
}

export const SocketEmit = (emit: any, data: any,) => {
  Socket_Url.emit(emit, data);
}



