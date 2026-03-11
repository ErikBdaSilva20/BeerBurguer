import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';

export function PrivateRoute({ adminOnly = false }) {
  const { userInfo, loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !userInfo.admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
