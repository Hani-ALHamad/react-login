import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: "",
  password: "",
  emailErrorMessage: " ",
  passwordErrorMessage: " ",
  moviesData: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // checks if user is logged in
    isLoggedIn: (state) => {
      if(!window.localStorage.getItem("user")){
        state.isLoggedIn = false
      } else {
        state.isLoggedIn = true
      }
    },
    
    //email state with validation
    email: (state, action) => {
      state.email = action.payload
      if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(state.email)){
        state.emailErrorMessage = "Please Enter a valid email"
      } else {
        state.emailErrorMessage = ""
      }
    },

    //password state with validation
    password: (state, action) => {
      state.password = action.payload
      //password must contain at least 1 capital letter and 1 special letter
      if(!/^(?=.*[A-Z])(?=.*[\W])(?=.*[@$!%*#?&]).{8,15}$/.test(state.password)){
        state.passwordErrorMessage = "password must be 8 - 15 long and must contain at least one capital letter and one special letter"
      } else {
        state.passwordErrorMessage = ""
      }
    },

    //handles the form submit when both email and password are valid, saves user and password in local storage and makes user logged in
    submit: (state) => {
      window.localStorage.setItem("user", JSON.stringify({email: state.email, password: state.password}))
      state.isLoggedIn = true;
    },


    //handles the movie data and saves them into state
    getMoviesData: (state, action) => {
        state.moviesData = action.payload 
    },


    //handles logout, makes user logged out and removes the item from local storage
    logOut: (state) => {
      window.localStorage.removeItem("user")
      state.isLoggedIn = false
      state.emailErrorMessage= " "
      state.passwordErrorMessage= " "
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { 
  isLoggedIn, 
  email, 
  password, 
  emailErrorMessage, 
  passwordErrorMessage,
  submit,
  moviesData,
  getMoviesData,
  logOut
} = userSlice.actions

export default userSlice.reducer