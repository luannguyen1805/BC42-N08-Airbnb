import { createSlice } from "@reduxjs/toolkit"
import { http } from "../../utils/setting"

const initialState = {
  arrUser: [],
  userUpdate: [],
  userPost: [],
  userAvatar: null
}

const userAdminReducer = createSlice({
  name: "userAdminReducer",
  initialState,
  reducers: {
    getAllUserAction: (state, action) => {
      state.arrUser = action.payload
    },
    setUserUpdate: (state, action) => {
      state.userUpdate = action.payload
    },
    userCreateAdmin: (state, action) => {
      state.userPost = action.payload
    },
    userChangeAvatar: (state, action) => {
      state.userAvatar = action.payload
    }
  }
})

export const {
  getAllUserAction,
  setUserUpdate,
  userCreateAdmin,
  userChangeAvatar
} = userAdminReducer.actions

export default userAdminReducer.reducer

//-------action api------------

export const getAllUser = () => {
  return async dispatch => {
    try {
      const result = await http.get("/users")
      let arrUser = result.data.content
      const action = getAllUserAction(arrUser)
      console.log(result)

      dispatch(action)
      console.log(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateUser = (id, data) => {
  return async dispatch => {
    try {
      let result = await http.put(`/users/${id}`, data)
      console.log({ result })
      let action = setUserUpdate(result.data.content)
      dispatch(action)
    } catch (error) {
      console.log({ error })
    }
  }
}

export const createUser = data => {
  console.log(data)
  return async dispatch => {
    try {
      const result = await http.post("/users", data)
      //   let userPost: UserPost[] = result.data.content;
      const action = userCreateAdmin(result.data.content)
      console.log(result)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUser = id => {
  return async dispatch => {
    try {
       await http.delete(`/users?id=${id}`);
    } catch (err) {
      console.log(err)
    }
  }
}

//Api get User extend Id

export const getUserById = id => {
  return async dispatch => {
    try {
      let result = await http.get(`/users/${id}`)
      console.log({ result })
      let action = setUserUpdate(result.data.content)
      dispatch(action)
    } catch (err) {
      console.log({ err })
    }
  }
}

// Api pagination users
export const getPaginationUser = page => {
  return async dispatch => {
    try {
      const result = await http.get(
        `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=10`
      )
      const arrUser = result.data.content
      const action = getAllUserAction(arrUser)
      console.log("main1", result)
      dispatch(action)
    } catch (err) {
      console.log({ err })
    }
  }
}

export const UpdateAvatarUser = data => {
  return async dispatch => {
    try {
      const result = await http.post("/users/upload-avatar", data)
      const action = userChangeAvatar(result.data.content)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const SearchUser = name => {
  return async dispatch => {
    try {
      const result = await http.get(`/users/search/${name}`)
      const arrUser = result.data.content
      const action = getAllUserAction(arrUser)
      console.log(result)
      dispatch(action)
    } catch (err) {
      console.log({ err })
    }
  }
}
