import React from 'react';

const ProgressCircle = ({ progress = 0.75, size = 40 }) => {
  const angle = progress * 360;
const circleStyle = {
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  background: `radial-gradient(#FEFBF6 55%, transparent 56%), conic-gradient(#007bff 0deg, #FF4081 90deg, #1B9C85 180deg, #007bff 270deg, #007bff 360deg)`,
};


  return <div style={circleStyle}></div>;
};

export default ProgressCircle;
