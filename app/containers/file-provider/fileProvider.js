import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { getPackageFolder } from '../../utils';
import { getSettings, saveSettings } from '../../utils/storage';

export const FileContext = createContext({
  packagePaths: [],
  currentPackagePath: '',
  packageFolders: [],
  currentPackageFolder: '',
  setFilePath: () => {}
});

class FileProvider extends React.Component {
  constructor() {
    super();
    this.setFilePath = this.setFilePath.bind(this);
    this.updateCurrentPackagePath = this.updateCurrentPackagePath.bind(this);
  }

  state = {
    packagePaths: [],
    packageFolders: [],
    currentPackageFolder: '',
    currentPackagePath: ''
  };

  async componentDidMount() {
    const settings = await getSettings();
    if (settings && settings.packagePaths)
      this.setState({ packagePaths: settings.packagePaths });
  }

  setFilePath({ packagePath, packageFolder }) {
    return new Promise((resolve, reject) => {
      try {
        const { packagePaths } = this.state;
        const updatedPackagePaths = packagePaths.concat(packagePath);

        this.setState(
          prevState => ({
            packagePaths: updatedPackagePaths,
            packageFolders: [packagePath, ...prevState.packagePaths],
            currentPackageFolder: packageFolder,
            currentPackagePath: packagePath
          }),
          resolve
        );
        saveSettings({ packagePaths: updatedPackagePaths });
      } catch (e) {
        reject(e);
      }
    });
  }

  updateCurrentPackagePath(packagePath, callback) {
    const packageFolder = getPackageFolder(packagePath);

    this.setState(
      {
        currentPackagePath: packagePath,
        currentPackageFolder: packageFolder
      },
      callback
    );
  }

  render() {
    const {
      packagePaths,
      currentPackagePath,
      packageFolders,
      currentPackageFolder
    } = this.state;
    const { children } = this.props;

    return (
      <FileContext.Provider
        value={{
          packagePaths,
          currentPackagePath,
          packageFolders,
          currentPackageFolder,
          setFilePath: this.setFilePath,
          updateCurrentPackagePath: this.updateCurrentPackagePath
        }}
      >
        {children}
      </FileContext.Provider>
    );
  }
}

FileProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default FileProvider;
