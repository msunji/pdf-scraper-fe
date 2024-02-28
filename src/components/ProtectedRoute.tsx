import { useAuth } from '../context/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { currentUserSession } = useAuth();
    const user = currentUserSession?.email;
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}

export default ProtectedRoute;