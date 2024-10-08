import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './reducers/peopleReducer';
import creditsReducer from './reducers/creditsReducer';
import watchListReducer from './reducers/watchListReducer';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    credits: creditsReducer,
    watchList: watchListReducer,
  },
});

export default store;
