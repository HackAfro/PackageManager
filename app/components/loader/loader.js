import React from 'react';
import styles from './loader.css';

const ProgressLoader = () => (
  <div className={styles.fulfillingSquareSpinner}>
    <div className={styles.spinnerInner} />
  </div>
);

export default ProgressLoader;
