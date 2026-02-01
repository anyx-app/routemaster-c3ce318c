import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for routes that don't exist yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-6 py-20">
    <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
    <p className="text-lg text-slate-400">This feature is currently under development.</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="routes" element={<PlaceholderPage title="Route Planning" />} />
        <Route path="vehicles" element={<PlaceholderPage title="Fleet Management" />} />
        <Route path="analytics" element={<PlaceholderPage title="Analytics Dashboard" />} />
        <Route path="settings" element={<PlaceholderPage title="System Settings" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
