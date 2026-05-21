import { configureStore } from "@reduxjs/toolkit";
import reducer from "./AuthSlice";
const store = configureStore({
  reducer:{
   auth:reducer 
  }
})

export default store