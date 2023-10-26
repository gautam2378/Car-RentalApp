// carSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  selectedCarId: null, 
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setSelectedCarId: (state, action) => {
        state.selectedCarId = action.payload;
      },
  },
});

export const { setCars, setSelectedCarId } = carSlice.actions;
export const selectCars = (state) => state.car.cars;
export const selectSelectedCarId = (state) => state.car.selectedCarId;
export default carSlice.reducer;
