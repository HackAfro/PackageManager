import React, { Component } from 'react';
import Props from 'prop-types';
import ArrowRight from 'react-feather/dist/icons/arrow-right';

import { parsePackageFile } from '../../../utils';
import styles from './index.css';
import { FileContext } from '../../../containers/file-provider/fileProvider';

class ProjectsList extends Component {
  static contextType = FileContext;

  static propTypes = {
    projectPaths: Props.arrayOf(Props.string).isRequired,
    history: Props.objectOf(Props.any).isRequired
  };

  constructor() {
    super();
    this.onProjectClick = this.onProjectClick.bind(this);
  }

  state = {
    projectsInfo: []
  };

  componentDidMount() {
    const { projectPaths } = this.props;
    const lastTwoPaths = projectPaths.length
      ? projectPaths.slice(projectPaths.length - 2)
      : projectPaths;
    this.getProjectNames(lastTwoPaths);
  }

  async getProjectNames(projectPaths = ['']) {
    const projectsInfoPromise = projectPaths.map(async projectPath => {
      const packageFile = await parsePackageFile(projectPath);
      return {
        name: packageFile.name || packageFile.projectName,
        path: projectPath
      };
    });
    const projectsInfo = await Promise.all(projectsInfoPromise);
    this.setState({
      projectsInfo
    });
  }

  onProjectClick(projectPath) {
    const { updateCurrentPackagePath } = this.context;
    const { history } = this.props;

    updateCurrentPackagePath(projectPath, () => history.push('/package'));
  }

  render() {
    const { projectsInfo } = this.state;

    return (
      <ul className={styles.projectList}>
        {projectsInfo.map(({ name, path }, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={styles.projectItem}
            onClick={() => this.onProjectClick(path)}
            onKeyDown={e => {
              if (e.key.toLowerCase() === 'enter') {
                this.onProjectClick(path);
              }
            }}
            tabIndex={index}
            key={name}
          >
            <div className={styles.projectDetails}>
              <span className={styles.projectName}>{name}</span>
              <span className={styles.projectPath}>{path}</span>
            </div>

            <div>
              <ArrowRight size={22} className={styles.sideIcon} />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default ProjectsList;
