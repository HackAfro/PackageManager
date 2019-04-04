import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressLoader from '../loader/loader';
import styles from './package.css';
import { parsePackageFile } from '../../utils';
import PackageSidebar from './sidebar/sidebar';
import DependenciesList from '../dependencies-list';

export default class Package extends Component {
  static propTypes = {
    packagePath: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    loadingText: 'Analysing and parsing package file',
    fileData: {}
  };

  componentDidMount() {
    this.analyseAndParseFile();
  }

  async analyseAndParseFile() {
    const { packagePath } = this.props;
    const fileData = await parsePackageFile(packagePath);
    console.log(fileData);
    this.setState({ loading: false, fileData });
  }

  render() {
    const { loading, loadingText, fileData } = this.state;

    return loading ? (
      <div className={styles.loaderArea}>
        <ProgressLoader />
        <h5 className={styles.loadingText}>{loadingText}</h5>
      </div>
    ) : (
      <div className={styles.packageArea}>
        <PackageSidebar packageInfo={fileData} />
        <div className={styles.packageInfo}>
          <DependenciesList packageInfo={fileData} />
        </div>
      </div>
    );
  }
}
