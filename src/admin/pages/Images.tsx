import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const CATEGORIES = [
  'Nameboard',
  'Hoarding',
  'Lightboard',
  'Wall Branding',
  'Glass Branding',
  'MDF Counter',
  'Iron Racks'
];

export default function Images() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    // MOCKED API CALL
    setTimeout(() => {
      setMessage(`Mock: Image uploaded successfully to ${category}!`);
      setFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setLoading(false);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Images</h1>
        
        {message && <div className="mb-4 bg-green-50 text-green-700 p-3 rounded">{message}</div>}
        {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded">{error}</div>}

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image File</label>
            <div className="mt-1 flex items-center">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
