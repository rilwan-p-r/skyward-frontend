import React from 'react';

interface FilePreviewProps {
  url: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ url }) => {
  return (
    <div className="file-preview mt-2">
      <img src={url} alt="Preview" className="w-full h-auto max-h-60 object-contain rounded-lg shadow-md" />
    </div>
  );
};

export default FilePreview;