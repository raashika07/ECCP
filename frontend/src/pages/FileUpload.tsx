import React, { useState, useEffect } from 'react';
import axios from 'axios';

type UploadedFile = {
  name: string;
  url: string;
};

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // Fetch uploaded files when component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get<UploadedFile[]>('http://localhost:5000/api/files');
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post<{ filename: string }>('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`✅ File uploaded successfully: ${res.data.filename}`);
      setFile(null);
      fetchFiles(); // Refresh file list
    } catch (err) {
      console.error(err);
      setMessage("❌ File upload failed.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
      
      <input type="file" onChange={handleChange} className="mb-4" />
      
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      {/* Show uploaded files */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {files.map((f, idx) => (
              <li key={idx}>
                <a href={`http://localhost:5000/uploads/${f.name}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
