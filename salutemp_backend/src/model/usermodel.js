const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/mydb'); // Update with your credentials

class User extends Model {}

User.init({
  // need to define shema 
  notificationToken: DataTypes.STRING,
  // other fields
}, { sequelize, modelName: 'user' });

module.exports = User;

const axios = require('axios');

async function sendExpoPushNotification(expoPushToken, messageBody) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    body: messageBody,
    data: { someData: 'goes here' },
  };

  await axios.post('https://exp.host/--/api/v2/push/send', message);
}
