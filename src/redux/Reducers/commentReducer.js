import { createSlice } from "@reduxjs/toolkit"
import { http } from "../../utils/setting"

const initialState = {
  commentById: []
}

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    CommentRoomId: (state, action) => {
      state.commentById = action.payload
    }
  }
})

export const { CommentRoomId } = commentReducer.actions

export default commentReducer.reducer

//--------call api --------------------

export const getCommentRoomById = id => {
  return async dispatch => {
    try {
      let result = await http.get(`/binh-luan`)
      let arrComment = result.data.content
      // console.log(arrComment)
      let arrCommentId = arrComment.reduce((arr, item) => {
        if (item.maPhong === id) {
          arr.push(item)
        }
        return arr
      }, [])
      const action = CommentRoomId(arrCommentId)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}
