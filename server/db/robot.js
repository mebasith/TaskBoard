const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('robot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fuelType: {
    type: Sequelize.ENUM('gas', 'diesel', 'electric'),
    defaultValue: 'electric',
  },
  fuelLevel: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 100,
    },
    defaultValue: 100,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PS8P6WXDPd7WI-nYr_Ufszybx2qEOf1BUw&usqp=CAU',
  },
});
