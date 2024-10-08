import { createSlice } from '@reduxjs/toolkit';
import creditsService from '../services/creditsService';

const creditsSlice = createSlice({
  name: 'credits',
  initialState: [],
  reducers: {
    setCredits(state, action) {
      console.log('setCredits');
      return action.payload;
    },
    appendCredits(state, action) {
      console.log('appendCredits');
      return [...state, action.payload];
    },
    dropCredits(state, action) {
      console.log('dropCredits');
      const _id = action.payload._id;
      const newState = state.filter((credits) => credits._id !== _id);
      return newState;
    },
  },
});

export const { setCredits, appendCredits, dropCredits } = creditsSlice.actions;

export const initializeCredits = () => {
  return async (dispatch) => {
    const credits = await creditsService.getCredits();
    dispatch(setCredits(credits));
  };
};

export const addCredits = (_id) => {
  return async (dispatch) => {
    const credits = await creditsService.getCreditsById(_id);
    dispatch(appendCredits(credits));
  };
};

export const removeCredits = (_id) => {
  return (dispatch) => dispatch(dropCredits(_id));
};

export default creditsSlice.reducer;
