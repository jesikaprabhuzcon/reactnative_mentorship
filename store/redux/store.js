import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorite';
//import favoritesReducer from './favorites';

export const store = configureStore({
  reducer: {
    favoriteMeals: favoritesReducer
  }
});