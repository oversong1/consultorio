import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

// Simulando componentes de página (vamos criá-los logo em seguida)
// const Login = () => <div>Página de Login</div>;
// const Dashboard = () => <div>Página de Dashboard (Logado!)</div>;

export function AppRoutes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública: Se já estiver logado, manda para a Dashboard */}
        <Route 
          path="/" 
          element={!signed ? <Login /> : <Navigate to="/dashboard" />} 
        />

        {/* Rota Privada: Se não estiver logado, manda para o Login */}
        <Route 
          path="/dashboard" 
          element={signed ? <Dashboard /> : <Navigate to="/" />} 
        />

        {/* Redireciona qualquer rota inexistente para o Login ou Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}