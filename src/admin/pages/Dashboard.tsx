import AdminLayout from '../components/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to the SuperAds Admin Panel.</p>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-900">Manage Content</h3>
            <p className="mt-2 text-sm text-blue-700">Use the sidebar to navigate to Images or Team settings.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
