import styled, { keyframes } from "styled-components";

export const UploadStatusContainer = styled.div`
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;

  @media (min-width: 768px) {
    padding: 1.5rem;
    width: 60%;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
    width: 50%;
  }
`;

export const Message = styled.p`
  font-size: 1.25rem;
  font-family: "Inter", sans-serif;
  color: ${({ color }) => color || "#555"};
  margin: 0.5rem 0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.75rem;
  }
`;

export const jump = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0); 
  }
  40% {
    transform: translateY(-0.625rem);
  }
  60% {
    transform: translateY(-0.3125rem);
  }
`;

export const Dot = styled.span`
  display: inline-block;
  animation: ${jump} 1.5s infinite;
  animation-delay: ${({ delay }) => delay};
`;

export const messages = {
  uploading: (
    <span>
      Analysing your resume
      <Dot delay="0s">.</Dot>
      <Dot delay="0.2s">.</Dot>
      <Dot delay="0.4s">.</Dot>
    </span>
  ),
  success: "Success! Your dream job awaits!",
  error: "Oops! Something went wrong. Try again!",
};
