import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  details: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
  },

  extraReducers: {},
});

export const { setDetails } = homeSlice.actions;

export const selectDetails = (state) => state.home.details;

export default homeSlice.reducer;
