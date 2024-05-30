import React from 'react';
import {
  UploadStatusContainer,
  Message,
  messages,
} from '../styles/UploadStatusStyles.styles';

const UploadStatus = ({ uploadStatus }) => (
  <UploadStatusContainer>
    <Message>{messages[uploadStatus]}</Message>
  </UploadStatusContainer>
);

export default UploadStatus;
