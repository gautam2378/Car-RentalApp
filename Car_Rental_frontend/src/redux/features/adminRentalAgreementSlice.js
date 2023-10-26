// adminRentalAgreementSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminRentalAgreements: [],
};

const adminRentalAgreementSlice = createSlice({
  name: 'adminRentalAgreement',
  initialState,
  reducers: {
    setRentalAgreements: (state, action) => {
      state.adminRentalAgreements = action.payload;
    },
    updateRentalAgreement: (state, action) => {
      const updatedAgreement = action.payload;
      const index = state.adminRentalAgreements.findIndex((agreement) => agreement.id === updatedAgreement.id);
      if (index !== -1) {
        state.adminRentalAgreements[index] = updatedAgreement;
      }
      
    },
    deleteRentalAgreement: (state, action) => {
      const idToDelete = action.payload;
      state.adminRentalAgreements = state.adminRentalAgreements.filter((agreement) => agreement.id !== idToDelete);
    },
  },
});

export const {
  setRentalAgreements,
  updateRentalAgreement,
  deleteRentalAgreement,
} = adminRentalAgreementSlice.actions;

export const selectAdminRentalAgreements = (state) => state.adminRentalAgreement.adminRentalAgreements;

export default adminRentalAgreementSlice.reducer;
