// rentalAgreementSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rentalAgreements: [],
};

const rentalAgreementSlice = createSlice({
  name: 'rentalAgreement',
  initialState,
  reducers: {
    setRentalAgreements: (state, action) => {
      state.rentalAgreements = action.payload;
    },
    clearRentalData: (state) => {
      state.rentalAgreements = null;
      
    },
  },
});

export const { setRentalAgreements,clearRentalData } = rentalAgreementSlice.actions;
export const selectRentalAgreements = (state) => state.rentalAgreement.rentalAgreements;
export default rentalAgreementSlice.reducer;
