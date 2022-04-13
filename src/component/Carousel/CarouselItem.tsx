import React, { useState } from 'React';
import './CarouselStyle.css';

export const CarouselItem = ({ children, width }) => {
  return (
      <div className='carousel-item' style={{ width: width }} >
        {children}        
      </div>
    );
};