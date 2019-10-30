const fs = require('fs');
const kristianTinderData = require('./data.json');
console.log(kristianTinderData.User.email);
console.log(Object.entries(kristianTinderData.Usage.matches).slice(0, 5));

const cloneTinderData = {
  ...kristianTinderData,
  User: {
    ...kristianTinderData.User,
    email: 'boe@husleie.no',
    birth_date: '1989-11-01T00:00:00.000Z',
  },
  Usage: {
    ...kristianTinderData.Usage,
    matches: Object.entries(kristianTinderData.Usage.matches).reduce(
      (acc, [key, val]) => {
        const newVal = val - Math.floor(Math.random() * 8 - 4);
        return {
          ...acc,
          [key]: newVal >= 0 ? newVal : 0,
        };
      },
      {}
    ),
    app_opens: Object.entries(kristianTinderData.Usage.app_opens).reduce(
      (acc, [key, val]) => {
        const newVal = val - Math.floor(Math.random() * 8 - 4);
        return {
          ...acc,
          [key]: newVal >= 0 ? newVal : 0,
        };
      },
      {}
    ),
    messages_sent: Object.entries(
      kristianTinderData.Usage.messages_sent
    ).reduce((acc, [key, val]) => {
      const newVal = val - Math.floor(Math.random() * 8 - 4);
      return {
        ...acc,
        [key]: newVal >= 0 ? newVal : 0,
      };
    }, {}),
    messages_received: Object.entries(
      kristianTinderData.Usage.messages_received
    ).reduce((acc, [key, val]) => {
      const newVal = val - Math.floor(Math.random() * 8 - 4);
      return {
        ...acc,
        [key]: newVal >= 0 ? newVal : 0,
      };
    }, {}),
    swipes_likes: Object.entries(kristianTinderData.Usage.swipes_likes).reduce(
      (acc, [key, val]) => {
        const newVal = val - Math.floor(Math.random() * 8 - 4);
        return {
          ...acc,
          [key]: newVal >= 0 ? newVal : 0,
        };
      },
      {}
    ),
    swipes_passes: Object.entries(
      kristianTinderData.Usage.swipes_passes
    ).reduce((acc, [key, val]) => {
      const newVal = val - Math.floor(Math.random() * 8 - 4);
      return {
        ...acc,
        [key]: newVal >= 0 ? newVal : 0,
      };
    }, {}),
  },
};

console.log(cloneTinderData.User.email);
console.log(Object.entries(cloneTinderData.Usage.matches).slice(0, 5));
fs.writeFileSync('./worse.json', JSON.stringify(cloneTinderData));
