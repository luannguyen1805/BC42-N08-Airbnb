import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const initialState = {
  arrUser: [],
  userUpdate: null,
  userPost: null,
  userAvatar: null,
};

export const getAllUser = createAsyncThunk(
  "userAdmin/getAllUser",
  async () => {
    try {
      const response = await http.get("/users");
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "userAdmin/updateUser",
  async ({ id, data }) => {
    try {
      const response = await http.put(`/users/${id}`, data);
      console.log(response.data.content);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createUser = createAsyncThunk(
  "userAdmin/createUser",
  async (data) => {
    try {
      const response = await http.post("/users", data);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userAdmin/deleteUser",
  async (id) => {
    try {
      await http.delete(`/users?id=${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getUserById = createAsyncThunk(
  "userAdmin/getUserById",
  async (id) => {
    try {
      const response = await http.get(`/users/${id}`);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getPaginationUser = createAsyncThunk(
  "userAdmin/getPaginationUser",
  async (page) => {
    try {
      const response = await http.get(
        `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=10`
      );
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateAvatarUser = createAsyncThunk(
  "userAdmin/updateAvatarUser",
  async (data) => {
    try {
      const response = await http.post("/users/upload-avatar", data);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const searchUser = createAsyncThunk(
  "userAdmin/searchUser",
  async (name) => {
    try {
      const response = await http.get(`/users/search/${name}`);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState,
  reducers: {
    setUserUpdate: (state, action) => {
      state.userUpdate = action.payload;
    },
    setUserPost: (state, action) => {
      state.userPost = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.arrUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdate = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userPost = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        // Handle delete success if needed
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userUpdate = action.payload;
      })
      .addCase(getPaginationUser.fulfilled, (state, action) => {
        state.arrUser = action.payload;
      })
      .addCase(updateAvatarUser.fulfilled, (state, action) => {
        state.userAvatar = action.payload;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.arrUser = action.payload;
      });
  },
});

export const {
  setUserUpdate,
  setUserPost,
  setUserAvatar
} = userAdminSlice.actions;

export default userAdminSlice.reducer;
