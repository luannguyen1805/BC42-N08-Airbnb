import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

export const getAllRoom = createAsyncThunk("roomReducer/getAllRoom", async () => {
  try {
    const result = await http.get("/phong-thue");
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const getDetailRoom = createAsyncThunk(
  "roomReducer/getDetailRoom",
  async (id) => {
    try {
      const result = await http.get(`/phong-thue/${id}`);
      return result.data.content;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const createNewRoom = createAsyncThunk("roomReducer/createNewRoom", async (data) => {
  try {
    const result = await http.post("/phong-thue", data);
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const roomActionAdmin = createAsyncThunk("roomReducer/roomActionAdmin", async ({ id, data }) => {
  try {
    const result = await http.put(`/phong-thue/${id}`, data);
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const deleteRoomApi = createAsyncThunk("roomReducer/deleteRoomApi", async (id) => {
  try {
    await http.delete(`/phong-thue/${id}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const getRoomListByLocation = createAsyncThunk("roomReducer/getRoomListByLocation", async (id) => {
  try {
    const result = await http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const initialState = {
  roomArray: [],
  roomDetail: [],
  roomPost: [],
  roomPut: [],
  roomList: [],
  roomListLocation: [],
};

const roomReducer = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRoom.fulfilled, (state, action) => {
      state.roomArray = action.payload;
    });
    builder.addCase(getDetailRoom.fulfilled, (state, action) => {
      state.roomDetail = action.payload;
    });
    builder.addCase(createNewRoom.fulfilled, (state, action) => {
      state.roomPost = action.payload;
    });
    builder.addCase(roomActionAdmin.fulfilled, (state, action) => {
      state.roomPut = action.payload;
    });
    builder.addCase(getRoomListByLocation.fulfilled, (state, action) => {
      state.roomListLocation = action.payload;
    });
  },
});

export default roomReducer.reducer;
