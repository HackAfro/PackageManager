import React from 'react';
import PropTypes from 'prop-types';

const { shell } = require('electron');

const BrowserLink = ({ children, className = '', href, ...others }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <span
    className={`${className} browser-link`}
    onClick={() => shell.openExternal(href)}
    onKeyPress={e => {
      if (e.key.toLowerCase() === 'enter') shell.openExternal(href);
    }}
    {...others}
  >
    {children}
  </span>
);

BrowserLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired
};

BrowserLink.defaultProps = {
  className: ''
};

export default BrowserLink;
