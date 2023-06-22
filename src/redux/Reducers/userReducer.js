import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../../App";
import { ACCESS_TOKEN, getStoreJSON, http, setStore, setStoreJSON, USER_LOGIN } from "../../utils/setting";

const initialState = {
  userLogin: getStoreJSON(USER_LOGIN) || {},
  userProfile: {},
  userBooking: [],
  userProfiles: [],
};


export const postSignupUser = createAsyncThunk(
  "userReducer/postSignupUser",
  async (data) => {
    try {
      const result = await http.post("/auth/signup", data);
      console.log({ result });
      history.push("/login");
    } catch (error) {
      console.log({ error });
      alert(error.response.data.content);
      throw error;
    }
  }
);

export const postSignIn = createAsyncThunk(
  "userReducer/postSignIn",
  async (data) => {
    try {
      const result = await http.post("/auth/signin", data);
      setStore(ACCESS_TOKEN, result.data.content.token);
      const { avatar, birthday, email, gender, id, name, role } = result.data.content.user;
      const userLoginData = {
        avatar,
        birthday,
        email,
        gender,
        id,
        name,
        role,
      };
      setStoreJSON(USER_LOGIN, userLoginData);
      return result.data.content.user;
    } catch (error) {
      const err = error.response.data.content;
      alert(err);
      throw error;
    }
  }
);

export const getUserProfileAPI = createAsyncThunk(
  "userReducer/getUserProfileAPI",
  async (_, { getState, rejectWithValue }) => {
    try {
      const id = getState().userReducer.userLogin?.id;
      if (id) {
        const result = await http.get(`/users/${id}`);
        return result.data.content;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);



export const getBookingUserApi = createAsyncThunk(
  "userReducer/getBookingUserApi",
  async (_, { getState, rejectWithValue }) => {
    try {
      const idUserLogin = getState().userReducer.userLogin?.id;
      if (idUserLogin) {
        const result = await http.get(`/dat-phong/lay-theo-nguoi-dung/${idUserLogin}`);
        return result.data.content;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);

export const putUserProfileAPI = createAsyncThunk(
  "userReducer/putUserProfileAPI",
  async (data, { getState }) => {
    try {
      const id = getState().userReducer.userLogin?.id;
      const result = await http.put(`/users/${id}`, data);
      localStorage.removeItem(USER_LOGIN);
      await setStoreJSON(USER_LOGIN, result.data.content);
      return result.data.content;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "userReducer/updateUser",
  async ({ id, data }) => {
    try {
      const response = await http.put(`/users/${id}`, data);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateAvatarUser = createAsyncThunk(
  "userReducer/updateAvatarUser",
  async (data) => {
    try {
      const result = await http.post("/users/upload-avatar", data);
      return result.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);



const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    singout: (state, action) => {
      return { ...state, userLogin: null }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSignupUser.fulfilled, (state, action) => { 
        
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.userLogin = action.payload;
      })
      .addCase(getUserProfileAPI.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getBookingUserApi.fulfilled, (state, action) => {
        state.userBooking = action.payload;
      })
      .addCase(putUserProfileAPI.fulfilled, (state, action) => {
        state.userProfiles = action.payload;
      })
      .addCase(updateAvatarUser.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
  },
});

export const { singout } = userSlice.actions;

export default userSlice.reducer;
