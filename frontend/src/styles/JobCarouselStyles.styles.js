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

export const JobCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  border-left: 10px solid #68bc74;
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: hidden;
  margin: 20px auto;
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

  h3 {
    margin-top: 0;
    color: #333;
    font-size: 1.2rem;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.8rem;
    }
  }

  h2 {
    margin-top: 10px;
    color: #20146c;
    font-size: 1.5rem;
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 2rem;
    }

    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }

  p {
    margin-top: 20px;
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    white-space: pre-line;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.2rem;
    }

    b {
      color: #20146c;
    }
  }

  .location {
    margin-top: 15px;
    color: #888;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.1rem;
    }
  }

  .tags {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tag {
    background-color: #007bff;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 0.9rem;
    }

    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }
`;
