import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { FileContext } from './file-provider/fileProvider';
import Package from '../components/package/package';

export default class PackagePage extends Component {
  render() {
    return (
      <FileContext.Consumer>
        {({ currentPackagePath }) =>
          currentPackagePath ? (
            <Package packagePath={currentPackagePath} />
          ) : (
            <Redirect to="/" />
          )
        }
      </FileContext.Consumer>
    );
  }
}
