import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress from '@material-ui/core/CircularProgress';

export const DropzoneContainer = styled.div`
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px dashed #68bc74;
  border-radius: 20px;
  padding: 4rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  background-color: white;
  width: 50%;
  min-width: 150px;
  max-width: 300px;
  min-width: 150px;
  max-height: 300px;
  aspect-ratio: 1 / 1;

  &:hover {
    border-color: #6a0dad;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${({ color }) => color || '#68bc74'};
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

export const Message = styled.p`
  font-size: 1rem;
  color: ${({ color }) => color || '#555'};
  margin: 10px 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const Spinner = styled(CircularProgress)`
  margin-top: 20px;
`;
