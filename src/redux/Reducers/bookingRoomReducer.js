import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const initialState = {
  roombookingList: [],
  roombookingPut: [],
  roombookingPost: [],
  status: "idle",
  error: null,
};

export const getAllRoomBooking = createAsyncThunk(
  "booking/getAllRoomBooking",
  async () => {
    try {
      const response = await http.get("/dat-phong");
      return response.data.content;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const putRoomBookingApi = createAsyncThunk(
  "booking/putRoomBookingApi",
  async ({ id, data }) => {
    try {
      const response = await http.put(`/dat-phong/${id}`, data);
      return response.data.content;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const deleteRoomBookingApi = createAsyncThunk(
  "booking/deleteRoomBookingApi",
  async (id) => {
    try {
      await http.delete(`/dat-phong/${id}`);
      return id;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const getRoomBookingApiID = createAsyncThunk(
  "booking/getRoomBookingApiID",
  async (id) => {
    try {
      const response = await http.get(`/dat-phong/${id}`);
      return response.data.content;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const createRoomBookingApi = createAsyncThunk(
  "booking/createRoomBookingApi",
  async (data) => {
    try {
      const response = await http.post("/dat-phong", data);
      return response.data.content;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoomBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllRoomBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roombookingList = action.payload;
      })
      .addCase(getAllRoomBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(putRoomBookingApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putRoomBookingApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roombookingPut = action.payload;
      })
      .addCase(putRoomBookingApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteRoomBookingApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRoomBookingApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Xử lý xóa đặt phòng khỏi state.roombookingList nếu cần thiết
      })
      .addCase(deleteRoomBookingApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getRoomBookingApiID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRoomBookingApiID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roombookingPut = action.payload;
      })
      .addCase(getRoomBookingApiID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRoomBookingApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoomBookingApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roombookingPost = action.payload;
      })
      .addCase(createRoomBookingApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default bookingSlice.reducer;
