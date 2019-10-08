const fs = require('fs');
const kristianTinderData = require('./data.json');

const cloneTinderData = {
  ...kristianTinderData,
  User: {
    ...kristianTinderData.User,
    email: 'kristian@boe.ventures',
  },
  Usage: {
    ...kristianTinderData.Usage,
    matches: Object.entries(kristianTinderData.Usage.matches).reduce(
      (acc, [key, val]) => ({
        ...acc,
        key: val + Math.abs(Math.random() * (5 - -3) + -3),
      }),
      {}
    ),
  },
};

fs.writeFileSync('./cloneData.json', JSON.stringify(cloneTinderData));
