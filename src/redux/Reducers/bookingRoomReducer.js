import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from '../../utils/setting';

export const getAllRoomBooking = createAsyncThunk(
  "bookingReducer/getAllRoomBooking",
  async () => {
    try {
      const response = await http.get("/dat-phong");
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const putRoomBookingApi = createAsyncThunk(
  "bookingReducer/putRoomBookingApi",
  async (payload) => {
    const { id, data } = payload;
    try {
      const response = await http.put(`/dat-phong/${id}`, data);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteRoomBookingApi = createAsyncThunk(
  "bookingReducer/deleteRoomBookingApi",
  async (id) => {
    try {
      await http.delete(`/dat-phong/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getRoomBookingApiID = createAsyncThunk(
  "bookingReducer/getRoomBookingApiID",
  async (id) => {
    try {
      const response = await http.get(`/dat-phong/${id}`);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createRoomBookingApi = createAsyncThunk(
  "bookingReducer/createRoomBookingApi",
  async (data) => {
    try {
      const response = await http.post("/dat-phong", data);
      return response.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const bookingSlice = createSlice({
  name: "bookingReducer",
  initialState: {
    roombookingList: [],
    roombookingPut: [],
    roombookingPost: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRoomBooking.fulfilled, (state, action) => {
      state.roombookingList = action.payload;
    });
    builder.addCase(putRoomBookingApi.fulfilled, (state, action) => {
      state.roombookingPut = action.payload;
    });
    builder.addCase(getRoomBookingApiID.fulfilled, (state, action) => {
      state.roombookingPut = action.payload;
    });
    builder.addCase(createRoomBookingApi.fulfilled, (state, action) => {
      state.roombookingPost = action.payload;
    });
    builder.addCase(deleteRoomBookingApi.fulfilled, (state, action) => {
      state.roombookingList = state.roombookingList.filter(
        (booking) => booking.id !== action.payload
      );
    });
  },
});

export default bookingSlice.reducer;
