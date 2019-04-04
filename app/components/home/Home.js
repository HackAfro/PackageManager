import React, { Component } from 'react';
import electron from 'electron';
import PropTypes from 'prop-types';

import { FileContext } from '../../containers/file-provider/fileProvider';
import Button from '../button/button';

import styles from './Home.css';
import AddFileIcon from './add-files.svg';
import ProjectsList from './projectList/projectList';
import { getPackageFolder } from '../../utils';

const { dialog } = electron.remote;

export default class Home extends Component {
  static contextType = FileContext;

  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired
  };

  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    const { setFilePath } = this.context;
    const { history } = this.props;
    e.preventDefault();

    dialog.showOpenDialog(
      {
        title: 'Select package.json file',
        buttonLabel: 'Select',
        properties: ['openFile'],
        filters: [{ name: 'Package files', extensions: ['json'] }]
      },
      async fileArray => {
        const [filePath] = fileArray;
        const packageFolder = getPackageFolder(filePath);

        await setFilePath({ packagePath: filePath, packageFolder });
        history.push('/package');
      }
    );
  }

  render() {
    const { packagePaths } = this.context;
    const { history } = this.props;
    const containerStyle = packagePaths.length
      ? styles.container
      : styles.containerCenter;

    return (
      <div className={containerStyle} data-tid="container">
        {packagePaths.length > 0 && (
          <div className={styles.projectListContainer}>
            <h3 className={styles.projectsHeader}>Opened Projects</h3>
            <div className={styles.projectList}>
              <ProjectsList projectPaths={packagePaths} history={history} />
            </div>
          </div>
        )}
        <div className={styles.fileSelectArea}>
          <img
            src={AddFileIcon}
            className={styles.fileSelectIcon}
            alt="add files"
          />
          <Button onClick={this.onButtonClick} primary>
            <span>Select Package File</span>
          </Button>
        </div>
      </div>
    );
  }
}
