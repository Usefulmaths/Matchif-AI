import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledJobCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  border-left: 6px solid #007bff;
  width: 100%;
  max-width: 700px;
  height: 70vh;
  overflow-y: auto;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media (min-width: 768px) {
    height: 70vh;
  }

  @media (min-width: 1024px) {
    height: 80vh;
  }

  &:hover {
    transform: translateY(-10px);
  }

  .content {
    overflow-y: auto;
    padding-bottom: 70px; /* Give space for the button */
    max-height: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const CompanyName = styled.h2`
  margin-top: 0;
  color: #20146c;
  font-size: 1.6rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export const JobTitle = styled.h3`
  margin: 10px 0;
  color: #333;
  font-size: 1.4rem;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const JobDescription = styled.p`
  margin-top: 20px;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-line;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }

  b {
    color: #20146c;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  background: #f0f4f8;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: #e8eef3;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const Icon = styled.div`
  margin-right: 8px;
  color: #007bff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

export const Location = styled.div`
  color: #333;
`;

export const Salary = styled.div`
  color: #333;
`;

export const WorkType = styled.div`
  color: #333;
`;

export const ExperienceLevel = styled.div`
  color: #333;
`;

export const ApplyButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  pointer-events: none; /* Prevent interaction with overlay */
`;

export const ApplyButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  pointer-events: all; /* Enable interaction with button */
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 12px 24px;
  }

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    padding: 14px 28px;
  }
`;
