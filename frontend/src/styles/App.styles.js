import styled from 'styled-components';
import { fadeIn } from './animations';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  animation: ${fadeIn} 1s ease-in-out;
  box-sizing: border-box;
  overflow: hidden; /* Prevent scrolling */
  position: relative;
`;

export default AppContainer;
