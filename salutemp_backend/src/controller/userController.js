// connect to database
const { Pool } = require('pg');
const pool = new Pool({
  // your database configuration
});

exports.updateUserToken = async (req, res) => {
  const { userId, expoPushToken } = req.body;
  
  try {
    const updateUserTokenQuery = 'UPDATE user_device SET device_id = $1 WHERE user_id = $2';
    const result = await pool.query(updateUserTokenQuery, [expoPushToken, userId]);
    
    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'User not found or token already up-to-date' });
    }

    res.status(200).send({ message: 'Token updated successfully' });
  } catch (error) {
    console.error('Error updating token:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const getUserQuery = 'SELECT * FROM "user" WHERE user_id = $1';
    const result = await pool.query(getUserQuery, [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const createUserQuery = 'INSERT INTO "user" (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(createUserQuery, [firstName, lastName, email]);
    
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deleteUserQuery = 'DELETE FROM "user" WHERE user_id = $1';
    const result = await pool.query(deleteUserQuery, [userId]);
    
    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
