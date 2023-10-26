// rentalAgreementActions.js
import axios from 'axios';
import Base_Url from './BaseUrl';

const config={
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
export const createRentalAgreement = async (carId, rentalStartDate, rentalEndDate) => {
  try {
    const response = await axios.post(`${Base_Url}/api/rentalagreements/createrentalagreement`, {
      carId,
      rentalStartDate,
      rentalEndDate,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if(response.data!=null)

    alert("agreement has been created!!");
    else { alert("Rental Agreement Not Created!")

  }

  } 
  
    catch (error) {
    console.error('Error creating rental agreement:', error);
    throw error;
  }
};

export const fetchUserRentalAgreements = async (userId) => {
  try {
    const response = await axios.get(`${Base_Url}/api/rentalAgreements/myrentalagreements/${userId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rental agreements:', error);
    throw error;
  }
};

export const editRentalAgreement = (rentalId, carId, rentalStartDate, rentalEndDate) =>async (dispatch)=> {
  try {
    const response = await axios.put(`${Base_Url}/api/rentalAgreements/${rentalId}`, {
        carId,
      rentalStartDate,
      rentalEndDate,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing rental agreement:', error);
    throw error;
  }
};

export const acceptRentalAgreement = async (id) => {
  try {
    const response = await axios.get(`${Base_Url}/api/rentalAgreements/${id}/accept`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    alert(response.data.message)
    return response.data;
  } catch (error) {
    console.error('Error accepting rental agreement:', error);
    throw error;
  }
};

export const requestReturn=(agreementId)=>async(dispatch)=>{
  try{
    const response=await axios.get(`${Base_Url}/api/rentalAgreements/${agreementId}/requestreturn`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    alert(response.data.message);
  }
  catch (error) {
    console.error('Error requesting return :', error);
    throw error;
  }
}
