import React, { Component } from 'react';
import electron from 'electron';
import PropTypes from 'prop-types';

import { FileContext } from '../../containers/file-provider/fileProvider';
import Button from '../button/button';
import ProjectsList from './projectList/projectList';
import { getPackageFolder, isNodeEnabled } from '../../utils';

import AddFileIcon from './images/add-files.svg';
import NodeUnavailable from './images/node_unavailable.svg';

import styles from './Home.css';
import BrowserLink from '../browser-link';

const { dialog } = electron.remote;
const NODE_DOWNLOAD_URL = 'https://nodejs.org/en/download/';

export default class Home extends Component {
  static contextType = FileContext;

  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired
  };

  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  state = {
    nodeAvailable: false
  };

  componentDidMount() {
    this.checkNodePresence();
  }

  async checkNodePresence() {
    const nodeAvailable = await isNodeEnabled();

    this.setState({
      nodeAvailable
    });
  }

  onButtonClick(e) {
    e.preventDefault();

    const { setFilePath } = this.context;
    const { history } = this.props;

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
    const { nodeAvailable } = this.state;
    const containerStyle = packagePaths.length
      ? styles.container
      : styles.containerCenter;

    return (
      <div className={containerStyle} data-tid="container">
        {packagePaths.length > 0 &&
          nodeAvailable && (
            <div className={styles.projectListContainer}>
              <h3 className={styles.projectsHeader}>Opened Projects</h3>
              <div className={styles.projectList}>
                <ProjectsList projectPaths={packagePaths} history={history} />
              </div>
            </div>
          )}
        {nodeAvailable ? (
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
        ) : (
          <div className={styles.fileSelectArea}>
            <img
              src={NodeUnavailable}
              alt="node is not present"
              className={styles.unavailableIcon}
            />
            <h4 className={styles.unavailableText}>
              Node is not installed in your PC. Please{' '}
              <BrowserLink
                style={{ color: '#ff1d5e', fontWeight: 600 }}
                href={NODE_DOWNLOAD_URL}
              >
                install
              </BrowserLink>{' '}
              Node before using application
            </h4>
          </div>
        )}
      </div>
    );
  }
}
