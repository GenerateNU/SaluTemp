const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user'); // Import your User model

const app = express();
app.use(bodyParser.json());

// this is what the file does
// 1. it creates a new user
// 2. it updates the user's notification token
// 3. it listens on port 3000

app.post('/updateToken', async (req, res) => {
  const { userId, token } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.notificationToken = token;
    await user.save();

    res.status(200).send({ message: 'Token updated successfully' });
  } catch (error) {
    console.error('Error updating token:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});