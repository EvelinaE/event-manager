import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text = 'Default Text', onClick = () => {}, type = 'button' }) => {
  return (
    <button className="custom-button" onClick={onClick} type={type}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
