// UserInfo.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser,selectToken } from '../redux/features/authSlice';
import axios from 'axios';
import AdminHomePage from './admin/AdminHomePage';
import UserHomePage from './user/UserHomePage';
import { useNavigate } from 'react-router';
import Base_Url from '../services/BaseUrl';

function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const localToken=useSelector(selectToken)||null;
  const navigate=useNavigate();
  useEffect(()=>{
    if(localToken==null)
    {
      navigate("/");
    }
  },[])
  useEffect(() => {
    // Fetch user information using the token and update the user state
    
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/auth/userinfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("user",response.data)
        dispatch(setUser(response.data));
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    fetchUserInfo();
  }, [dispatch]);
  
  return (
    <div>
      {user?.isAdmin ? <AdminHomePage/> : <UserHomePage/>}
      
    </div>
  );
}

export default UserInfo;
