import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import styled from '@emotion/styled';

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 24px auto;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(44,62,80,0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagesRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`;

const PlayerImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
  box-shadow: 0 1px 4px rgba(44,62,80,0.13);
`;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  max-width: 240px;
  height: 24px;
  margin: 0 auto;
`;

const Thumb = styled.div`
  height: 24px;
  width: 24px;
  background: var(--green, #2ecc40);
  border-radius: 50%;
  cursor: grab;
  box-shadow: 0 2px 6px rgba(44,62,80,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Track = styled.div`
  top: 10px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
`;

const ValueLabel = styled.div`
  margin-top: 12px;
  font-size: 15px;
  font-weight: 700;
  color: var(--green, #2ecc40);
  letter-spacing: 0.5px;
`;

const dummyImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/12.jpg',
];

const TeamSlider = () => {
  const [value, setValue] = useState(50);

  return (
    <SliderWrapper>
      <ImagesRow>
        {dummyImages.map((src, idx) => (
          <PlayerImg key={idx} src={src} alt={`Player ${idx + 1}`} />
        ))}
      </ImagesRow>
      <StyledSlider
        value={value}
        min={0}
        max={100}
        onChange={setValue}
        renderThumb={(props, state) => <Thumb {...props}>{state.valueNow}</Thumb>}
        renderTrack={(props, state) => <Track {...props} />}
      />
      <ValueLabel>{value}</ValueLabel>
    </SliderWrapper>
  );
};

export default TeamSlider;