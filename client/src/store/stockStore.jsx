import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../shared/stockSlice';

export default configureStore({
  reducer: {
    stock: stockReducer,
  },
});