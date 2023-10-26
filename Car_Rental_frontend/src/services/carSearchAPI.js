// actions.js
import axios from 'axios';
import { setCars } from '../redux/features/carSlice';
import Base_Url from './BaseUrl';

export const fetchCars = (maker, model, rentalPrice) => async (dispatch) => {
  try {
    
    const response = await axios.get(`${Base_Url}/api/cars/search?maker=${maker}&model=${model}&rentalPrice=${rentalPrice}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    dispatch(setCars(response.data));
  } catch (error) {
    console.error('Error fetching cars:', error);
  }
};