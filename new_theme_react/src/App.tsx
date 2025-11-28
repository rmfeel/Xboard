import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import DashboardLayout from './layout/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import Dashboard from './pages/Dashboard';
import Plan from './pages/Plan';
import Order from './pages/Order';
import Node from './pages/Node';
import Profile from './pages/Profile';
import Ticket from './pages/Ticket';
import Knowledge from './pages/Knowledge';
import Traffic from './pages/Traffic';
import GiftCard from './pages/GiftCard';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import ServerError from './pages/ServerError';

// Define the global settings type from Xboard
interface XboardSettings {
  title: string;
  assets_path: string;
  theme: {
    color: string;
  };
  version: string;
  background_url: string;
  description: string;
  i18n: string[];
  logo: string;
}

declare global {
  interface Window {
    settings: XboardSettings;
    routerBase: string;
  }
}

function App() {
  const settings = window.settings || {
    title: 'Xboard Dev',
    theme: { color: 'default' },
    version: '0.0.0',
    description: 'Development Mode'
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
            colorPrimary: settings.theme.color === 'blue' ? '#1677ff' : '#00b96b',
        }
      }}
    >
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="/404" element={<NotFound />} />
          
          <Route path="/" element={<DashboardLayout />}>
             <Route index element={<Navigate to="/dashboard" replace />} />
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="plan" element={<Plan />} />
             <Route path="order" element={<Order />} />
             <Route path="node" element={<Node />} />
             <Route path="profile" element={<Profile />} />
             <Route path="ticket" element={<Ticket />} />
             <Route path="knowledge" element={<Knowledge />} />
             <Route path="traffic" element={<Traffic />} />
             <Route path="gift-card" element={<GiftCard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
