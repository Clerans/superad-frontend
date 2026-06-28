import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import PublicHome from '@/app/pages/PublicHome';
import AdminLogin from '@/app/components/admin/AdminLogin';
import AdminLayout from '@/app/components/admin/AdminLayout';
import AdminDashboard from '@/app/components/admin/AdminDashboard';
import ProjectList from '@/app/components/admin/ProjectList';
import ProjectForm from '@/app/components/admin/ProjectForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website home page */}
        <Route path="/" element={<PublicHome />} />

        {/* Admin authorization routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard wrapper and nested routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
        </Route>

        {/* Catch-all fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}