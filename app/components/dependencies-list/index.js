import React from 'react';
import PropTypes from 'prop-types';
import Dependency from './dependency';

import styles from './index.css';

const Dependencies = ({ dependencies }) =>
  Object.keys(dependencies).map(dependency => {
    const pkg = {
      packageName: dependency,
      packageVersion: dependencies[dependency]
    };

    return <Dependency dependency={pkg} key={dependency} />;
  });

const DevDependencies = ({ devDependencies }) =>
  Object.keys(devDependencies).map(dependency => {
    const pkg = {
      packageName: dependency,
      packageVersion: devDependencies[dependency]
    };

    return <Dependency dependency={pkg} key={dependency} />;
  });

const DependenciesList = ({
  packageInfo: { dependencies, devDependencies }
}) => (
  <div className={styles.container}>
    {dependencies && (
      <section className="dependencies list">
        <h4 className={styles.header}>Dependencies</h4>
        <Dependencies dependencies={dependencies} />
      </section>
    )}

    {devDependencies && (
      <section className="devDependencies list">
        <h4 className={styles.header}>Dev Dependencies</h4>
        <DevDependencies devDependencies={devDependencies} />
      </section>
    )}
  </div>
);

DependenciesList.propTypes = {
  packageInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default DependenciesList;
