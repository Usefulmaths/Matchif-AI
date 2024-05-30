import styled from 'styled-components';

export const CircleContainer = styled.div`
  z-index: 4;
  position: absolute;
  background-color: #68bc74;
  border-radius: 50%;
  opacity: 0.8;

  &:nth-child(1) {
    width: 20vw;
    height: 20vw;
    top: -10vw;
    left: -10vw;

    @media (min-width: 768px) {
      width: 15vw;
      height: 15vw;
      top: -7.5vw;
      left: -7.5vw;
    }

    @media (min-width: 1024px) {
      width: 10vw;
      height: 10vw;
      top: -5vw;
      left: -5vw;
    }
  }

  &:nth-child(2) {
    width: 5vw;
    height: 5vw;
    top: 10vw;
    left: 10vw;

    @media (min-width: 768px) {
      width: 4vw;
      height: 4vw;
      top: 8vw;
      left: 8vw;
    }

    @media (min-width: 1024px) {
      width: 3vw;
      height: 3vw;
      top: 6vw;
      left: 6vw;
    }
  }

  &:nth-child(3) {
    width: 20vw;
    height: 20vw;
    top: 15vw;
    right: -10vw;

    @media (min-width: 768px) {
      width: 15vw;
      height: 15vw;
      top: 12.5vw;
      right: -7.5vw;
    }

    @media (min-width: 1024px) {
      width: 10vw;
      height: 10vw;
      top: 10vw;
      right: -5vw;
    }
  }

  &:nth-child(5) {
    width: 5vw;
    height: 5vw;
    top: 15vw;
    right: 12.5vw;

    @media (min-width: 768px) {
      width: 4vw;
      height: 4vw;
      top: 12vw;
      right: 10vw;
    }

    @media (min-width: 1024px) {
      width: 3vw;
      height: 3vw;
      top: 9vw;
      right: 7.5vw;
    }
  }
`;
