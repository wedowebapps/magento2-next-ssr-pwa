import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./homePageSlice";
import productPageSlice from "./productPageSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    homepage: homePageSlice,
    productPage: productPageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
