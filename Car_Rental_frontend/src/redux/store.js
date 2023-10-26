import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import Redux Thunk middleware
import authReducer from './features/authSlice';
import carReducer from './features/carSlice';
import rentalAgreementReducer from './features/rentalAgreementSlice';
import adminRentalAgreementReducer from './features/adminRentalAgreementSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    rentalAgreement: rentalAgreementReducer,
    adminRentalAgreement:adminRentalAgreementReducer,
  },
  middleware: [ thunk], 
});
