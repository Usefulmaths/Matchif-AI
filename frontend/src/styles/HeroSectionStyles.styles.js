import styled from "styled-components";

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  background-color: #130c49;
  color: white;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  padding: 2rem;
  z-index: 2;

  @media (min-width: 768px) {
    height: 60vh;
  }

  @media (min-width: 1024px) {
    height: 70vh;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  position: absolute;
  top: 20%;
  z-index: 3;
  margin: 0 1rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    top: 16%;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
    top: 9%;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 200;
  font-style: italic;
  position: absolute;
  top: 30%;
  z-index: 3;
  margin: 0 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    top: 26%;
  }

  @media (min-width: 1024px) {
    font-size: 1.8rem;
    top: 20%;
  }
`;

export const WaveDivider = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1;
  height: 80px;

  @media (min-width: 768px) {
    height: 100px;
  }

  @media (min-width: 1024px) {
    height: 120px;
  }
`;
