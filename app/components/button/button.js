import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.css';

const Button = ({ children, onClick }) => (
  <button onClick={onClick} type="button" className={styles.button}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick: () => {}
};

export default Button;
