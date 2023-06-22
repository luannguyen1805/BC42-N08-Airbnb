import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const initialState = {
  commentById: [],
};

export const getCommentRoomById = createAsyncThunk(
  "commentReducer/getCommentRoomById",
  async (id) => {
    try {
      const result = await http.get(`/binh-luan`);
      const arrComment = result.data.content;
      const arrCommentId = arrComment.reduce((arr, item) => {
        if (item.maPhong === id) {
          arr.push(item);
        }
        return arr;
      }, []);
      return arrCommentId;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    CommentRoomId: (state, action) => {
      state.commentById = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentRoomById.fulfilled, (state, action) => {
      state.commentById = action.payload;
    });
  },
});

export const { CommentRoomId } = commentReducer.actions;

export default commentReducer.reducer;
