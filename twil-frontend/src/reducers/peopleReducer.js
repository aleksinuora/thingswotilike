import { createSlice } from '@reduxjs/toolkit';
import peopleService from '../services/peopleService';

const peopleSlice = createSlice({
  name: 'people',
  initialState: [],
  reducers: {
    setPeople(state, action) {
      return action.payload;
    },
    appendPerson(state, action) {
      return [...state, action.payload];
    },
    unfollowPerson(state, action) {
      const _id = action.payload;
      const newState = state.filter((person) => person._id !== _id);
      return newState;
    },
  },
});

export const { setPeople, appendPerson, unfollowPerson } = peopleSlice.actions;

export const initializePeople = () => {
  return async (dispatch) => {
    const people = await peopleService.getPeople();
    dispatch(setPeople(people));
  };
};

export const createPerson = (name, api_specific_id) => {
  return async (dispatch) => {
    const newPerson = await peopleService.addPerson(name, api_specific_id);
    dispatch(appendPerson(newPerson));

    return newPerson;
  };
};

export const deletePerson = (_id) => {
  return async (dispatch) => {
    await peopleService.unfollowPerson(_id);
    dispatch(unfollowPerson(_id));
  };
};

export default peopleSlice.reducer;
