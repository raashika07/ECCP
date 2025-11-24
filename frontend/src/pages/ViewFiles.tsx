import { useEffect, useState } from 'react';
import axios from 'axios';

interface UploadedFile {
  name: string;
  url: string;
}

const ViewFiles = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get<UploadedFile[]>('http://localhost:5000/api/files');
        setFiles(res.data as UploadedFile[]);
      } catch (err) {
        console.error('Failed to fetch files', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (filename: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${filename}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/files/${filename}`);
      setFiles(prev => prev.filter(f => f.name !== filename));
      alert("✅ File deleted successfully.");
    } catch (err) {
      console.error("Error deleting file", err);
      alert("❌ Failed to delete file.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {files.map(file => (
            <li key={file.name} className="border p-3 rounded">
              <p className="text-gray-800 mb-2 font-medium">{file.name}</p>

              {/* Preview section */}
              {file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img
                  src={`http://localhost:5000${file.url}`}
                  alt={file.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              ) : file.name.match(/\.pdf$/i) ? (
                <iframe
                  src={`http://localhost:5000${file.url}`}
                  className="w-full h-40 mb-2 border rounded"
                  title={file.name}
                />
              ) : (
                <p className="text-sm text-gray-500 mb-2">Preview not available</p>
              )}

              <div className="flex gap-2">
                <a
                  href={`http://localhost:5000${file.url}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Download
                </a>
                <button
                  onClick={() => handleDelete(file.name)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFiles;
