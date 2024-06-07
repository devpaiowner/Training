import Cookie from "js-cookie";
const setAuthUser = (user) => Cookie.set("authUser", JSON.stringify(user));
export const useAuthUser = () => {
  const authUser = Cookie.get("authUser");
  return [authUser ? JSON.parse(authUser) : authUser, setAuthUser];
};
