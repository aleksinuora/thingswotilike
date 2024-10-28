import { createSlice } from '@reduxjs/toolkit';
import creditsService from '../services/creditsService';
import { sortByPremiere, sortDetails } from '../utils/sortByPremiere';

const creditsSlice = createSlice({
  name: 'credits',
  initialState: [],
  reducers: {
    setCredits(state, action) {
      return action.payload;
    },
    appendCredits(state, action) {
      return sortByPremiere([action.payload, ...state]);
    },
    dropCredits(state, action) {
      const person_id = action.payload;
      const newState = state.filter(
        (credits) => credits.person_id !== person_id
      );
      return newState;
    },
  },
});

export const { setCredits, appendCredits, dropCredits } = creditsSlice.actions;

export const initializeCredits = () => {
  return async (dispatch) => {
    const credits = await creditsService.getCredits();
    dispatch(setCredits(sortByPremiere(credits)));
  };
};

export const addCredits = (person_id) => {
  return async (dispatch) => {
    const credits = await creditsService.getCreditsById(person_id);
    const sortedCredits = {
      ...credits,
      credit_details: sortDetails(credits.credit_details),
    };
    dispatch(appendCredits(sortedCredits));
  };
};

export const removeCredits = (person_id) => {
  return (dispatch) => dispatch(dropCredits(person_id));
};

export default creditsSlice.reducer;
