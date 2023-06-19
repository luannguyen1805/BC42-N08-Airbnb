import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const initialState = {
  locationList: [],
  locationPut: [],
  locationpost: [],
};

export const getLocationApi = createAsyncThunk(
  "locationReducer/getLocationApi",
  async () => {
    try {
      const result = await http.get("/vi-tri");
      return result.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const putlocationApi = createAsyncThunk(
  "locationReducer/putlocationApi",
  async ({ id, data }) => {
    try {
      const result = await http.put(`/vi-tri/${id}`, data);
      return result.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const deletelocationApi = createAsyncThunk(
  "locationReducer/deletelocationApi",
  async (id) => {
    try {
      const result = await http.delete(`/vi-tri/${id}`);
      return result.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);


export const createLocationApi = createAsyncThunk(
  "locationReducer/createLocationApi",
  async (data) => {
    try {
      const result = await http.post("/vi-tri", data);
      return result.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  );
  
export const getLocationDetailById = createAsyncThunk(
  "locationReducer/getLocationDetailById",
  async (id) => {
    try {
      const result = await http.get(`/vi-tri/${id}`);
      console.log(result.data.content);
      return result.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationApi.fulfilled, (state, action) => {
      state.locationList = action.payload;
    });
    builder.addCase(putlocationApi.fulfilled, (state, action) => {
      state.locationPut = action.payload;
    });
    builder.addCase(createLocationApi.fulfilled, (state, action) => {
      state.locationpost = action.payload;
    });
    builder.addCase(getLocationDetailById.fulfilled, (state, action) => {
      state.locationPut = action.payload;
    });
  },
});

export default locationReducer.reducer;
