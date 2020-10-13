import React from 'react';

const Div = ({ children, ...restProps }) => React.createElement('div', restProps, children);

export default Div;
