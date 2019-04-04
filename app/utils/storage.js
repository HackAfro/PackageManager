import storage from 'electron-json-storage';

export const saveSettings = (data = {}, key = 'SETTINGS') =>
  new Promise((resolve, reject) => {
    storage.set(key, data, err => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve();
    });
  });

export const getSettings = (key = 'SETTINGS') =>
  new Promise((resolve, reject) => {
    storage.get(key, (err, data) => {
      if (err) {
        console.log(err);

        reject(err);
      }

      resolve(data);
    });
  });
