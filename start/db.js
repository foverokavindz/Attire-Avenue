const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect('mongodb://localhost:27017/attire-avenue')
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      console.error('Could not connected to DB');
    });
};
