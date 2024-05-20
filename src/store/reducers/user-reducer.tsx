import { createSlice } from '@reduxjs/toolkit'
import { LocationData } from 'types/entities-types';

type Props = {
  userInfo: any
  location?: LocationData
  is_login: boolean
};

const initialState = {
  userInfo: {
    email:'',
    name:'',
    userId:'',
    location:undefined
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    // demoAsync: (state, action) => {
    //   state.userInfo = action.payload
    // },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    reset: (state,action)=>{
      return initialState;
    },
    resetUser: (state, action) => {
      return initialState;
    }

    
    
  },
})
// Action creators are generated for each case reducer function
export const { 
  setUserInfo,
  setLocation,
  reset,
  resetUser
  // demoAsync
 } = userSlice.actions

 
// export const demoAsyncFun = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(demoAsync(amount))
//   }, 1000)
// }
export default userSlice.reducer