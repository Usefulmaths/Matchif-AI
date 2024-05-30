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
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  border-left: 10px solid #68bc74;
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: hidden;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .content {
    overflow-y: auto;
    max-height: 100%;
  }
`;

export const CompanyName = styled.h2`
  margin-top: 10px;
  color: #20146c;
  font-size: 1.3rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.1rem;
  }
`;

export const JobTitle = styled.h3`
  margin-top: 5px;
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

export const JobDescription = styled.p`
  margin-top: 15px;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
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

export const Location = styled.div`
  margin-top: 10px;
  color: #888;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const TagsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  background-color: #007bff;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }

  @media (min-width: 1024px) {
    font-size: 0.9rem;
  }
`;
