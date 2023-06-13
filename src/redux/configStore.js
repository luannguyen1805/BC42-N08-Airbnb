import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import userAdminReducer from "./Reducers/userAdminReducer";
import roomReducer from "./Reducers/roomReducer";
import openModalReducer from "./Reducers/openModalReducer";
import locationReducer from "./Reducers/locationReducer";
import bookingReducer from "./Reducers/bookingRoomReducer";
import commentReducer from "./Reducers/commentReducer";


const store = configureStore({
  reducer: {
    userReducer: userReducer,
    userAdminReducer: userAdminReducer,
    roomReducer: roomReducer,
    openModalReducer: openModalReducer,
    locationReducer: locationReducer,
    bookingReducer: bookingReducer,
    commentReducer:commentReducer,
  },
});


export { store};

