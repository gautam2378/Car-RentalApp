import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({isAdmin, isSignedIn, children }) {
  if (!isSignedIn || isAdmin) {
    return <Navigate to="/unauthorized" replace />
  }
  return children
}
export default Protected;