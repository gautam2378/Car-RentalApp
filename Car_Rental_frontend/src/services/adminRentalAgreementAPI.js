import axios from 'axios';
import { setRentalAgreements, updateRentalAgreement, deleteRentalAgreement } from '../redux/features/adminRentalAgreementSlice';
import { setCars } from '../redux/features/carSlice';
import Base_Url from './BaseUrl';




const config={
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}; 

export const fetchAdminRentalAgreements = () => async (dispatch) => {
  try {
    const response = await axios.get(`${Base_Url}/api/admin/rentalAgreements`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch(setRentalAgreements(response.data));
  } catch (error) {
    console.error('Error fetching admin rental agreements:', error);
    throw error;
  }
};

export const adminAddCar=(carData)=>async(dispatch)=>{
  try{
    const response = await axios.post(`${Base_Url}/api/admin/addcar`, carData, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    alert(response.data.message)
  }
  catch (error) {
    console.error('Error adding car', error);
    throw error;
  }
}

export const updateAdminRentalAgreement = (id, updatedAgreementData) => async (dispatch) => {
  try {
    const response = await axios.put(`${Base_Url}/api/admin/rentalAgreements/${id}`, updatedAgreementData, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch(updateRentalAgreement(response.data));
    alert("updated the agreement with ID ",response.data.id);

  } catch (error) {
    console.error('Error updating admin rental agreement:', error);
    throw error;
  }
};

export const deleteAdminRentalAgreement = (id) => async (dispatch) => {
  try {
    const response=await axios.delete(`${Base_Url}/api/admin/rentalAgreements/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch(deleteRentalAgreement(id));
    alert(response.data.message);
  } catch (error) {
    console.error('Error deleting admin rental agreement:', error);
    throw error;
  }
};

export const validateReturnCars = () => async (dispatch) => {
  try {
    const response = await axios.get(`${Base_Url}/api/admin/validateReturnCars`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch(setCars(response.data));
    
  } catch (error) {
    console.error('Error validating return cars:', error);
    throw error;
  }
};

export const markCarReturned = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${Base_Url}/api/admin/markCarReturned/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data);
    alert(response.data.message);
    window.location.reload();
  } catch (error) {
    console.error('Error marking car as returned:', error);
    throw error;
  }
};
