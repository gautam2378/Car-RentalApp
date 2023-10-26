import React from 'react'
import { Navigate } from 'react-router-dom'
function AdminProtected({ isSignedIn,isAdmin, children }) {
  if (!isSignedIn || !isAdmin) {
    return <Navigate to="/unauthorized" replace />
  }
  return children
}
export default AdminProtected