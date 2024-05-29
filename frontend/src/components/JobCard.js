import React from "react";
import {
  StyledJobCard,
  CompanyName,
  JobTitle,
  JobDescription,
} from "../styles/JobCard.styles";

const JobCard = ({ company, title, description}) => {
  const formatDescription = (description) => {
    return description.replace(/\n/g, "<br />");
  };

  return (
    <StyledJobCard>
      <div className="content">
        <CompanyName>{company}</CompanyName>
        <JobTitle>{title}</JobTitle>
        <JobDescription
          dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
        />
      </div>
    </StyledJobCard>
  );
};


export default JobCard;
