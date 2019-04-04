/* eslint global-require: 0, */

import fs from 'fs';
import { exec } from 'child_process';

if (process.env.NODE_ENV === 'production') {
  const fixPath = require('fix-path');

  fixPath();
}

export const parsePackageFile = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          reject(err);
          throw new Error('That file does not exist');
        }
      }
      const parsedFile = JSON.parse(data);
      resolve(parsedFile);
    });
  });

export const getPackageInfo = ({ pkg, variant = null }) =>
  new Promise((resolve, reject) => {
    exec(`npm view ${pkg} ${variant || ''} --json`, (err, stdout) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });

export const installPackage = ({ pkg, version, packageFolder }) =>
  new Promise((resolve, reject) => {
    const command = `npm  --prefix ${packageFolder} i ${pkg}@${version}`;
    console.log(command);
    exec(command, (err, stdout) => {
      if (err) {
        console.log(err);
        reject();
      }

      resolve(stdout);
    });
  });

export const getPackageFolder = packagePath => {
  const packageIndex = packagePath.indexOf('package.json');
  const packageFolder = packagePath.slice(0, packageIndex);

  return packageFolder;
};
