import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  authForProfileImageReducer,
  listingFeeReducer,
  propValueReducer,
  updateInfoReducer,
} from "@/redux/features/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authForProfileImage: authForProfileImageReducer,
    calForListingFee: listingFeeReducer,
    setPropertyInfo: propValueReducer,
    updateInfo: updateInfoReducer,
  },
});
