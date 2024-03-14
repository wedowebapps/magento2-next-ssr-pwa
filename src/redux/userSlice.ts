import {
  BrowserPersistence,
  cookieStorageKey,
  localStorageKeys,
} from "@/utils";
import CookiePersistence from "@/utils/cookiePersistence";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CurrentUserType {
  email: string;
  firstname: string;
  lastname: string;
}

interface UserState {
  token?: string;
  isSignedIn?: boolean;
  currentUser?: CurrentUserType;
}

const storage = new BrowserPersistence();
const localCookie = new CookiePersistence();
const token = storage.getItem(localStorageKeys.AUTH_TOKEN);

const initialState: UserState = {
  currentUser: { email: "", firstname: "", lastname: "" },
  isSignedIn: !!token ?? false,
  token,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    setToken: (state, action: PayloadAction<UserState>) => {
      if (action.payload.token) {
        storage.setItem(
          localStorageKeys.AUTH_TOKEN,
          action.payload.token,
          86400000,
        );
        localCookie.setItem(
          cookieStorageKey.AUTH_TOKEN,
          action.payload.token,
          86400000,
        );

        return {
          ...state,
          token: action.payload.token,
          isSignedIn: true,
        };
      }
    },
    clearToken: (state, action) => {
      storage.removeItem(localStorageKeys.AUTH_TOKEN);
      localCookie.removeItem(cookieStorageKey.AUTH_TOKEN);
      storage.setItem(localStorageKeys.CART_ID, "");

      return {
        ...state,
        token: "",
        isSignedIn: false,
      };
    },
  },
});

export const { setCurrentUser, setToken, clearToken } = UserSlice.actions;
export default UserSlice.reducer;
