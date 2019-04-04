import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from '../components/home/Home';

export default class HomePage extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired
  };

  render() {
    const { history } = this.props;
    return <Home history={history} />;
  }
}
