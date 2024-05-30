import React from 'react';
import {
  StyledJobCard,
  CompanyName,
  JobTitle,
  JobDescription,
  Location,
  Salary,
  WorkType,
  ExperienceLevel,
  InfoContainer,
  InfoItem,
  Icon,
  ApplyButtonContainer,
  ApplyButton,
} from '../styles/JobCard.styles';

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaChartLine,
} from 'react-icons/fa';

const currencySymbols = {
  USD: '$',
  CAD: 'C$',
  BBD: 'Bds$',
  EUR: '€',
  AUD: 'A$',
  GBP: '£',
  Unknown: '',
};

const JobCard = ({
  company,
  title,
  description,
  location,
  min_salary,
  max_salary,
  currency,
  work_type,
  experience_level,
  application_url,
}) => {
  const formatDescription = (description) => {
    return description.replace(/\n/g, '<br />');
  };

  const formatSalary = (min_salary, max_salary, currency) => {
    const symbol = currencySymbols[currency] || '';
    if (min_salary === 0.0 || max_salary === 0.0) {
      return 'Salary Not Provided';
    }
    return `${symbol}${min_salary.toLocaleString()} - ${symbol}${max_salary.toLocaleString()}`;
  };

  return (
    <StyledJobCard>
      <div className="content">
        <CompanyName>{company}</CompanyName>
        <JobTitle>{title}</JobTitle>
        <InfoContainer>
          <InfoItem>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <Location>{location}</Location>
          </InfoItem>
          <InfoItem>
            <Icon>
              <FaMoneyBillWave />
            </Icon>
            <Salary>{formatSalary(min_salary, max_salary, currency)}</Salary>
          </InfoItem>
          <InfoItem>
            <Icon>
              <FaBriefcase />
            </Icon>
            <WorkType>{work_type}</WorkType>
          </InfoItem>
          {experience_level !== 'Unknown' && (
            <InfoItem>
              <Icon>
                <FaChartLine />
              </Icon>
              <ExperienceLevel>{experience_level}</ExperienceLevel>
            </InfoItem>
          )}
        </InfoContainer>
        <JobDescription
          dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
        />
      </div>
      <ApplyButtonContainer>
        <ApplyButton onClick={() => window.open(application_url)}>Apply Now</ApplyButton>
      </ApplyButtonContainer>
    </StyledJobCard>
  );
};

export default JobCard;
