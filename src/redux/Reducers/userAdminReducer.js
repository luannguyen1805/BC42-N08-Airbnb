import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const initialState = {
  arrUser: [],
  userUpdate: [],
  userPost: [],
  userAvatar: null,
};

export const getUserApi = createAsyncThunk(
  "userAdminReducer/getUserApi",
  async (_, { dispatch }) => {
    try {
      const result = await http.get("/users");
      const arrUser = result.data.content;
      dispatch(getAllUserAction(arrUser));
    } catch (err) {
      console.log(err);
    }
  }
);

export const putUserApi = createAsyncThunk(
  "userAdminReducer/putUserApi",
  async ({ id, data }, { dispatch }) => {
    try {
      const result = await http.put(`/users/${id}`, data);
      dispatch(setUserUpdate(result.data.content));
    } catch (error) {
      console.log({ error });
    }
  }
);

export const createUserApi = createAsyncThunk(
  "userAdminReducer/createUserApi",
  async (data, { dispatch }) => {
    try {
      const result = await http.post("/users", data);
      dispatch(userCreateAdmin(result.data.content));
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteUserApi = createAsyncThunk(
  "userAdminReducer/deleteUserApi",
  async (id) => {
    try {
      await http.delete(`/users?id=${id}`);
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUserAPiID = createAsyncThunk(
  "userAdminReducer/getUserAPiID",
  async (id, { dispatch }) => {
    try {
      const result = await http.get(`/users/${id}`);
      dispatch(setUserUpdate(result.data.content));
    } catch (err) {
      console.log({ err });
    }
  }
);

export const getPaginationUser = createAsyncThunk(
  "userAdminReducer/getPaginationUser",
  async (page, { dispatch }) => {
    try {
      const result = await http.get(
        `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=10`
      );
      const arrUser = result.data.content;
      dispatch(getAllUserAction(arrUser));
    } catch (err) {
      console.log({ err });
    }
  }
);

export const updateAvatarUser = createAsyncThunk(
  "userAdminReducer/updateAvatarUser",
  async (data, { dispatch }) => {
    try {
      const result = await http.post("/users/upload-avatar", data);
      dispatch(userChangeAvatar(result.data.content));
    } catch (err) {
      console.log(err);
    }
  }
);

export const searchUser = createAsyncThunk(
  "userAdminReducer/searchUser",
  async (name, { dispatch }) => {
    try {
      const result = await http.get(`/users/search/${name}`);
      const arrUser = result.data.content;
      dispatch(getAllUserAction(arrUser));
    } catch (err) {
      console.log({ err });
    }
  }
);

const userAdminReducer = createSlice({
  name: "userAdminReducer",
  initialState,
  reducers: {
    getAllUserAction: (state, action) => {
      state.arrUser = action.payload;
    },
    setUserUpdate: (state, action) => {
      state.userUpdate = action.payload;
    },
    userCreateAdmin: (state, action) => {
      state.userPost = action.payload;
    },
    userChangeAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
  },
  extraReducers: {
    [getUserApi.fulfilled]: (state, action) => {
      state.arrUser = action.payload;
    },
    [putUserApi.fulfilled]: (state, action) => {
      state.userUpdate = action.payload;
    },
    [createUserApi.fulfilled]: (state, action) => {
      state.userPost = action.payload;
    },
    [getUserAPiID.fulfilled]: (state, action) => {
      state.userUpdate = action.payload;
    },
    [getPaginationUser.fulfilled]: (state, action) => {
      state.arrUser = action.payload;
    },
    [updateAvatarUser.fulfilled]: (state, action) => {
      state.userAvatar = action.payload;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.arrUser = action.payload;
    },
  },
});

export const {
  getAllUserAction,
  setUserUpdate,
  userCreateAdmin,
  userChangeAvatar,
} = userAdminReducer.actions;

export default userAdminReducer.reducer;
