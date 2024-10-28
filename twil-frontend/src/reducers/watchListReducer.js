import { createSlice } from '@reduxjs/toolkit';
import watchListService from '../services/watchListService';

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: [],
  reducers: {
    setWatchList(state, action) {
      return action.payload;
    },
    appendToWatchList(state, action) {
      return [action.payload, ...state];
    },
    dropFromWatchList(state, action) {
      const _id = action.payload._id;
      const newWatchList = state.filter((entry) => entry._id !== _id);
      return newWatchList;
    },
  },
});

export const { setWatchList, appendToWatchList, dropFromWatchList } =
  watchListSlice.actions;

export const initializeWatchList = () => {
  return async (dispatch) => {
    const watchList = await watchListService.getWatchList();
    dispatch(setWatchList(watchList));
  };
};

export const addToWatchList = (personName, credit) => {
  return async (dispatch) => {
    const newEntry = await watchListService.addWatchListEntry(
      personName,
      credit
    );
    dispatch(appendToWatchList(newEntry));
  };
};

export default watchListSlice.reducer;
