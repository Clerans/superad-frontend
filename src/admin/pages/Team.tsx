import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

export default function Team() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !file) {
      setError('Please fill all fields and select an image.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    // MOCKED API CALL
    setTimeout(() => {
      setMessage(`Mock: Team member ${name} added successfully!`);
      setName('');
      setRole('');
      setFile(null);
      const fileInput = document.getElementById('team-file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setLoading(false);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Team</h1>
        
        {message && <div className="mb-4 bg-green-50 text-green-700 p-3 rounded">{message}</div>}
        {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded">{error}</div>}

        <form onSubmit={handleAddMember} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <div className="mt-1 flex items-center">
              <input
                id="team-file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !file || !name || !role}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Add Team Member'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
