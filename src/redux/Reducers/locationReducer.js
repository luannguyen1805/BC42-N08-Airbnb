import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const getLocationApi = createAsyncThunk("locationReducer/getLocationApi", async () => {
  try {
    const result = await http.get("/vi-tri");
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const putlocationApi = createAsyncThunk("locationReducer/putlocationApi", async (payload) => {
  try {
    const result = await http.put(`/vi-tri/${payload.id}`, payload.data);
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const createLocationApi = createAsyncThunk("locationReducer/createLocationApi", async (payload) => {
  try {
    const result = await http.post("/vi-tri", payload);
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const getlocationApiID = createAsyncThunk("locationReducer/getlocationApiID", async (id) => {
  try {
    const result = await http.get(`/vi-tri/${id}`);
    return result.data.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const deletelocationApi = createAsyncThunk(
  "locationReducer/deletelocationApi",
  async (id) => {
    try {
      await http.delete(`/vi-tri/${id}`);
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
      return result.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const initialState = {
  locationList: [],
  locationPut: [],
  locationpost: [],
  localDetail: [],
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocationApi.fulfilled, (state, action) => {
        state.locationList = action.payload;
      })
      .addCase(putlocationApi.fulfilled, (state, action) => {
        state.locationPut = action.payload;
      })
      .addCase(createLocationApi.fulfilled, (state, action) => {
        state.locationpost = action.payload;
      })
      .addCase(getlocationApiID.fulfilled, (state, action) => {
        state.localDetail = action.payload;
      });
      builder.addCase(deletelocationApi.fulfilled, (state, action) => {
      });
      builder.addCase(getLocationDetailById.fulfilled, (state, action) => {
        state.localDetail = action.payload;
      });
  },
});

export { getLocationApi, putlocationApi, createLocationApi, getlocationApiID };

export default locationReducer.reducer;
