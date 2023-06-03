const express = require('express');
const pool = require('../db');
const { route } = require('./User');
const router = express.Router();

router.get('/allnews', async (req, res) => {
  const news = await pool.query('SELECT * FROM news');
  res.send({ status: 'success', news: news.rows });
});

router.post('/addnews', async (req, res) => {
  const { title, description } = req.body;
  await pool
    .query('INSERT INTO news (title, description) VALUES ($1, $2)', [
      title,
      description,
    ])
    .then(async () => {
      res.send({ status: 'success', message: 'News added successfully' });
    })
    .catch((err) => {
      res.send({ status: 'error', message: 'something went wrong' });
    });
});

module.exports = router;
