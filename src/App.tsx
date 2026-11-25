
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Workouts from './pages/Workouts';
import Profile from './pages/Profile';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: { main: '#008000' },
    secondary: { main: '#b388ff' },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/goals"
            element={<ProtectedRoute><Goals /></ProtectedRoute>}
          />
          <Route
            path="/workouts"
            element={<ProtectedRoute><Workouts /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
