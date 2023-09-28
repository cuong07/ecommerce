import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { json } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/effect-creative';

import { Autoplay, EffectCreative } from 'swiper/modules';
import { Box, Typography } from '@mui/material';

function SlideProduct({
  listImage, id, name, category,
}) {
  const arrayImage = JSON.parse(listImage);
  const { imageUrl } = useSelector((state) => state.context);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <Swiper
          grabCursor
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
          modules={[EffectCreative, Autoplay]}
          className="w-full h-[200px] shadow-lg"
          onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
          {arrayImage?.map((item) => (
            <SwiperSlide key={item}>
              <img
                src={imageUrl + item}
                alt="thumbnail"
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20" />
            </svg>
            <span ref={progressContent} />
          </div>
        </Swiper>
      </div>
      <div className="flex flex-col justify-between">
        <span>
          <span className="text-[#898A9A] text-xs font-light leading-4">
            ID
          </span>
          <Typography className="text-sm font-normal text-[#212539]">
            {id}
          </Typography>
        </span>
        <span>
          <span className="text-[#898A9A] text-xs font-light leading-4">
            Name
          </span>
          <Typography className="text-sm font-normal text-[#212539]">
            {name}
          </Typography>
        </span>
        <span>
          <span className="text-[#898A9A] text-xs font-light leading-4">
            Category
          </span>
          <Typography className="text-sm font-normal text-[#212539]">
            {category || 'No category'}
          </Typography>
        </span>
      </div>
    </div>
  );
}

SlideProduct.propTypes = {};

export default SlideProduct;
