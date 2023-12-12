import React, { useCallback, useState } from 'react';
import '../styles/FileUploader.css';

function FileUploader({ onFileDrop }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileDrop(files[0]); // Assuming only one file is handled for now
    }
  }, [onFileDrop]);

  return (
    <div
      className={`file-uploader ${dragOver ? 'drag-over' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drag and drop a file here, or click to select a file.
    </div>
  );
}

export default FileUploader;
