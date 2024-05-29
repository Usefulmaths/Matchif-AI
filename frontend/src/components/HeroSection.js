import React from "react";
import Wavify from "react-wavify";
import Circle from "./Circle";
import {
  HeroContainer,
  Title,
  SubTitle,
  WaveDivider,
} from "../styles/HeroSectionStyles.styles";

const HeroSection = () => (
  <HeroContainer>
    <Circle />
    <Circle />
    <Circle />
    <Circle />
    <Circle />
    <Title>Explore Opportunities</Title>
    <SubTitle>Discover jobs the smart way</SubTitle>
    <WaveDivider>
      <Wavify
        fill="#fafafa"
        paused={false}
        options={{
          amplitude: 30,
          speed: 0.3,
          points: 3,
        }}
      />
    </WaveDivider>
  </HeroContainer>
);

export default HeroSection;
