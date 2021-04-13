import React from 'react';
import PropTypes from 'prop-types';
import '../styles/button.css';

const Button = ({ title, isDisabled, onClick, className }) => (
  <button
    type="button"
    disabled={ isDisabled }
    onClick={ () => onClick() }
    className={ className }
  >
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  userRole: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  onClick: () => {},
  userRole: '',
  className: 'button',
};

export default Button;