import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div>
     <div className='row d-flex justify-content-center align-content-center'>
        <p className='display-2 text-primary'> Access Denied!</p>
        <p className='display-5 text-secondary'>You do not have permission to view this page.</p>
        <Link className='btn btn-warning btn-lg' to="/">Go to Login</Link>
    </div>
    </div>
  )
}

export default Unauthorized
