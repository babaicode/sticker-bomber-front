import React, { useState } from 'react';
import '../styles/UploadAvatarComponent.css';
import axios from 'axios';
import { Environment } from '@/environment';
import { useAlert } from '@/alert/AlertContext';
import { useTranslation } from 'react-i18next';

const UploadAvatarComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
        setSelectedFile(file);
        showAlert('File selected successfully!', 'success');
      } else {
        showAlert('Only JPEG, JPG, or PNG files are allowed.', 'error');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showAlert('No file selected.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('adminId', localStorage.getItem('adminId') || '');

    try {
      await axios.post(`${Environment.StickerBomberBackApiURL}/admin/upload-avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showAlert('File uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading file:', error);
      showAlert('Failed to upload file. Please try again.', 'error');
    }
  };

  return (
    <div className="upload-container">
      <h2>{t("upload-avatar")}</h2>
      <input type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
      {selectedFile && <p className="file-name">{t("select-file")}: {selectedFile.name}</p>}
      <button className="upload-button" onClick={handleUpload}>
        {t("upload")}
      </button>
    </div>
  );
};

export default UploadAvatarComponent;
