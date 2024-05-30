import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  faFileUpload,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  DropzoneContainer,
  Icon,
  Message,
  Spinner,
} from '../styles/DragAndDropSectionStyles.styles';

const DragAndDropSection = ({
  onDrop,
  uploadStatus,
  fileName,
  uploadProgress,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: 'application/pdf',
  });

  const renderContent = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <Spinner />;
      case 'success':
        return (
          <>
            <Icon icon={faCheckCircle} color="green" />
            <Message color="green">{fileName} uploaded successfully!</Message>
          </>
        );
      case 'error':
        return (
          <>
            <Icon icon={faTimesCircle} color="red" />
            <Message color="red">Failed to upload {fileName}</Message>
          </>
        );
      default:
        return (
          <>
            <Icon icon={faFileUpload} />
            <Message>
              {isDragActive ? 'Drop the file here...' : 'Upload Your Resume'}
            </Message>
          </>
        );
    }
  };

  return (
    <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {renderContent()}
    </DropzoneContainer>
  );
};

export default DragAndDropSection;
