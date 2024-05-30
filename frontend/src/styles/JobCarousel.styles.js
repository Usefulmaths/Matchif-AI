import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    font-weight: bold;
  }

  .swiper-button-next {
    right: 5%;
  }

  .swiper-button-prev {
    left: 5%;
  }
  @media (max-width: 1024px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 30px;
      height: 30px;
      top: 90%;
      color: #007bff;
    }

    .swiper-button-next {
      right: 20%;
    }

    .swiper-button-prev {
      left: 20%;
    }
  }
`;
