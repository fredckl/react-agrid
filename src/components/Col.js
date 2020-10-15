import React from 'react';

const Col = ({ children, className }) =>  { return (
  <div className={className || 'col'}>
    {children}
  </div>
);};


export default Col;
