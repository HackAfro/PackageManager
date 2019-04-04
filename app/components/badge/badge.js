import React from 'react';
import PropTypes from 'prop-types';

import styles from './badge.css';

const Badge = ({
  color,
  fontSize,
  icon,
  children,
  fontWeight,
  uppercase,
  ...others
}) => (
  <span
    className={`${color} ${styles.badge}`}
    style={{
      fontSize: `${fontSize}px`,
      backgroundColor: `${color}`,
      fontWeight,
      textTransform: `${uppercase ? 'uppercase' : 'capitalize'}`
    }}
    aria-label="badge"
    {...others}
  >
    {icon}
    {children}
  </span>
);

Badge.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  icon: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  uppercase: PropTypes.bool,
  fontWeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ])
};

Badge.defaultProps = {
  color: 'black',
  fontSize: 12,
  icon: '',
  children: '',
  uppercase: true,
  fontWeight: 500
};

export default Badge;
