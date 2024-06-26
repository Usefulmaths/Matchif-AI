import styled from 'styled-components';
import { fadeIn } from './animations';

export const CarouselWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 90%;
  height: 100%;
  border-radius: 15px;
  z-index: 5;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 1024px) {
    width: 70%;
  }
`;
