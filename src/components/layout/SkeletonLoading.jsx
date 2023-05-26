// components/SkeletonLoading.jsx
import React from 'react';
import './SkeletonLoading.css';

const SkeletonLoading = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-element"></div>
    </div>
  );
};

export default SkeletonLoading;
