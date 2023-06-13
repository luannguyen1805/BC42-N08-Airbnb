import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../utils/setting';

export const getCommentRoomById = createAsyncThunk(
  'commentReducer/getCommentRoomById',
  async (id) => {
    try {
      const response = await http.get(`/binh-luan`);
      const arrComment = response.data.content;
      const arrCommentId = arrComment.filter((item) => item.maPhong === id);
      return arrCommentId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: 'commentReducer',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentRoomById.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


export default commentSlice.reducer;