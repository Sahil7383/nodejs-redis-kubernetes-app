const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Create a Redis client
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

// Connect to Redis
redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Failed to connect to Redis:', err);
});

// Set a key-value pair in Redis
app.get('/set/:key/:value', async (req, res) => {
  const { key, value } = req.params;
  try {
    await redisClient.set(key, value);
    res.send(`Set ${key}=${value} in Redis`);
  } catch (err) {
    res.status(500).send(`Error setting key: ${err.message}`);
  }
});

// Get a value from Redis by key
app.get('/get/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const value = await redisClient.get(key);
    if (value === null) {
      res.status(404).send(`Key "${key}" not found in Redis`);
    } else {
      res.send(`Value for key "${key}": ${value}`);
    }
  } catch (err) {
    res.status(500).send(`Error getting key: ${err.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});