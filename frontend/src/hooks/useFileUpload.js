import axios from 'axios';
import { useState, useCallback } from 'react';

const useFileUpload = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const resetJobDescriptions = () => {
    setJobDescriptions([]);
    setUploadStatus('idle');
    setFileName('');
    setUploadProgress(0);
  };

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);

    setUploadStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post(`/api/job_postings/upload_and_create_profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      })
      .then((response) => {
        setUploadStatus('success');
        setJobDescriptions(response.data.job_postings);
      })
      .catch(() => {
        setUploadStatus('error');
      });
  }, []);

  return {
    jobDescriptions,
    uploadStatus,
    fileName,
    uploadProgress,
    handleDrop,
    resetJobDescriptions
  };
};

export default useFileUpload;
