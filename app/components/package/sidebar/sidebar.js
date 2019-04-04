import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Package from 'react-feather/dist/icons/package';
import Email from 'react-feather/dist/icons/mail';
import User from 'react-feather/dist/icons/user';
import ExternalLink from 'react-feather/dist/icons/external-link';
import ArrowBack from 'react-feather/dist/icons/arrow-left';

import icon from './imgs/package.png';
import styles from './sidebar.css';
import Badge from '../../badge/badge';

const PackageSidebar = ({ packageInfo }) => (
  <div className={styles.sidebar}>
    <div>
      <Link to="/">
        <ArrowBack size={22} className={styles.backButton} />
      </Link>
    </div>
    <div className={styles.sidebarHeader}>
      <img src={icon} alt="Package icon" className={styles.sidebarImg} />
    </div>
    <div className={styles.description}>
      <p className={styles.description}>{packageInfo.description || ''}</p>
    </div>
    <div className={styles.details}>
      <div className={styles.info}>
        <div className={styles.iconArea}>
          <Package size={22} className={styles.sideIcon} />
        </div>
        <h5 className={styles.infoText}>
          {packageInfo.productName || packageInfo.name}
        </h5>
      </div>
      {packageInfo.author && (
        <Fragment>
          <div className={styles.info}>
            <div className={styles.iconArea}>
              <Email size={22} className={styles.sideIcon} />
            </div>
            <h5 className={styles.infoText}>
              {packageInfo.author.email || ''}
            </h5>
          </div>
          <div className={styles.info}>
            <div className={styles.iconArea}>
              <User size={22} className={styles.sideIcon} />
            </div>
            <h5 className={styles.infoText}>{packageInfo.author.name}</h5>
          </div>
        </Fragment>
      )}
      {packageInfo.homePage && (
        <div className={styles.info}>
          <div className={styles.iconArea}>
            <a href={packageInfo.homepage} target="__blank">
              <ExternalLink size={22} className={styles.sideIcon} />
            </a>
          </div>
          <h5 className={styles.infoText}>GitHub</h5>
        </div>
      )}
      {packageInfo.keywords && (
        <div className="info">
          <div className={styles.keywordArea}>
            {packageInfo.keywords.map(keyword => (
              <div style={{ margin: '5px 0' }} key={keyword}>
                <Badge color="grey" fontSize={10} uppercase={false}>
                  {keyword}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

PackageSidebar.propTypes = {
  packageInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PackageSidebar;
