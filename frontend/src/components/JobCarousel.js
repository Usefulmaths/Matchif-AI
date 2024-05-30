import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import JobCard from './JobCard.js';
import { StyledSwiper } from '../styles/JobCarousel.styles.js';

const JobCarousel = ({ jobDescriptions }) => {
  return (
    <StyledSwiper navigation={true} modules={[Navigation]} spaceBetween={20}>
      {jobDescriptions.map((job, index) => (
        <SwiperSlide
          key={index}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <JobCard
            company={job.company}
            title={job.title}
            description={job.description}
            location={job.location}
            min_salary={job.min_salary}
            max_salary={job.max_salary}
            currency={job.currency}
            work_type={job.work_type}
            experience_level={job.experience_level}
            application_url={job.application_url}
          />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default JobCarousel;
