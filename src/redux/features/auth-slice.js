import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isLoggedIn: false,
    role: "",
    token: "",
    user: {},
  },
};
const initialStateForProfileImage = {
  value: {
    url: "",
    baseUrl: `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/`,
  },
};
const listingFee = {
  value: {
    amount: 1,
  },
};

const initialPropertyValue = {
  value: {
    id: "",
    propType: "",
  },
};

const initialUpdateValue = {
  value: {
    userData: {},
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      return initialState;
    },
    login: (state, action) => {
      const { user, token } = action.payload; // Destructure user and token from payload
      localStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
          role: user.Role,
          token: token,
          user: user,
        })
      );
      return {
        ...state,
        value: {
          isLoggedIn: true,
          role: user.Role,
          token: token,
          user: user, // Set user object from payload
        },
      };
    },
  },
});

export const manipulateListingFeeAmountSlice = createSlice({
  name: "calForListingFee",
  initialState: listingFee,
  reducers: {
    setAmount: (state, action) => {
      return {
        ...state,
        value: {
          amount: action.payload,
        },
      };
    },
  },
});

export const propertyInfo = createSlice({
  name: "setPropertyInfo",
  initialState: initialPropertyValue,
  reducers: {
    setValue: (state, action) => {
      return {
        ...state,
        value: {
          id: action.payload.id,
          propType: action.payload.propertyType,
        },
      };
    },
  },
});

export const updateData = createSlice({
  name: "updateInfo",
  initialState: initialUpdateValue,
  reducers: {
    setData: (state, action) => {
      return {
        ...state,
        value: {
          userData: action.payload,
        },
      };
    },
  },
});

export const authForProfileImageSlice = createSlice({
  name: "authForProfileImage",
  initialState: initialStateForProfileImage,
  reducers: {
    loadProfile: (state, action) => {
      return {
        ...state,
        value: {
          url: action.payload,
        },
      };
    },
  },
});

export const { logout, login } = authSlice.actions;
export const { loadProfile } = authForProfileImageSlice.actions;
export const { setAmount } = manipulateListingFeeAmountSlice.actions;
export const { setValue } = propertyInfo.actions;
export const { setData } = updateData.actions;

export const authReducer = authSlice.reducer;
export const authForProfileImageReducer = authForProfileImageSlice.reducer;
export const listingFeeReducer = manipulateListingFeeAmountSlice.reducer;
export const propValueReducer = propertyInfo.reducer;
export const updateInfoReducer = updateData.reducer;
