import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getPackageInfo, installPackage } from '../../../utils';
import { FileContext } from '../../../containers/file-provider/fileProvider';

import BrowserLink from '../../browser-link';

import styles from './index.css';

class Dependency extends Component {
  static contextType = FileContext;

  static containsCurrentVersion(versions = [], currentVersion = '') {
    return versions.includes(currentVersion.replace('^', ''));
  }

  state = {
    versions: [],
    packageUrl: ''
  };

  componentDidMount() {
    this.getPackageDetails();
  }

  onVersionChange = e => {
    e.preventDefault();

    const { value } = e.target;

    this.installPackageVersion(value);
  };

  async getPackageDetails() {
    const { dependency } = this.props;
    const versionsPromise = getPackageInfo({
      pkg: dependency.packageName,
      variant: 'versions'
    });
    const urlPromise = getPackageInfo({
      pkg: dependency.packageName,
      variant: 'url'
    });

    const [versionsString, url] = await Promise.all([
      versionsPromise,
      urlPromise
    ]);
    const versions = JSON.parse(versionsString);
    let last5Versions = versions.slice(versions.length - 5);

    if (
      !this.constructor.containsCurrentVersion(
        last5Versions,
        dependency.packageVersion
      )
    ) {
      last5Versions = last5Versions
        .splice(0, 5)
        .concat(this.cleanPackageVersion);
    }
    this.setState({
      versions: last5Versions,
      packageUrl: url
    });
  }

  async installPackageVersion(version) {
    const { currentPackageFolder } = this.context;
    const { dependency } = this.props;
    const { packageName } = dependency;

    await installPackage({
      pkg: packageName,
      packageFolder: currentPackageFolder,
      version
    });

    // eslint-disable-next-line no-new
    new Notification(`${packageName} version updated`, {
      title: `${packageName} version updated`,
      body: `${packageName} has been successfully updated to version ${version}`
    });
  }

  get cleanPackageVersion() {
    const { dependency } = this.props;
    return dependency.packageVersion.replace('^', '');
  }

  render() {
    const { versions, packageUrl } = this.state;
    const { dependency } = this.props;

    return (
      <div className={styles.item}>
        <BrowserLink href={packageUrl} className={styles.packageName}>
          {dependency.packageName}
        </BrowserLink>
        <div>
          <select
            name="version"
            className={styles.versionsInput}
            onChange={this.onVersionChange}
          >
            {versions.map(version => (
              <option
                value={version}
                key={version}
                selected={version === this.cleanPackageVersion}
              >
                {version}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

Dependency.propTypes = {
  dependency: PropTypes.shape({
    packageName: PropTypes.string,
    packageVersion: PropTypes.string
  }).isRequired
};

export default Dependency;
