import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import JobCard from "./JobCard.js";

const JobCarousel = ({ jobDescriptions }) => {

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      spaceBetween={20}
      style={{ height: "100%", width: "100%" }}
    >
      {jobDescriptions.map((job, index) => (
        <SwiperSlide
          key={index}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <JobCard
            company={job.company}
            title={job.title}
            description={job.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default JobCarousel;
