import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/authStore'
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}


const PrivateRoute = ({ children }: Props) => {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
