import React from 'react';
import PropTypes from 'prop-types';
import FileProvider from './file-provider/fileProvider';

const props = {
  children: PropTypes.Node
};

export default class App extends React.Component {
  props: props;

  render() {
    const { children } = this.props;
    return <FileProvider>{children}</FileProvider>;
  }
}
