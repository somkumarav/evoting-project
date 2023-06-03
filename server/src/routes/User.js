const express = require('express');
const pool = require('../db');
const router = express.Router();
const argon2 = require('argon2');
const nodemailer = require('nodemailer');
const sendMail = require('../sendmail');
const sendMailOTP = require('../sendMailOTP');

router.post('/user', async (req, res) => {
  const { email } = req.body;
  const user = await pool.query('SELECT * FROM accounts WHERE email = $1', [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.send({
      status: 'error',
      msg: 'Invalid email or password',
    });
  }
  console.log(user.rows[0]);
  res.send(user.rows[0]);
});

router.get('/allvoters', async (req, res) => {
  const voters = await pool.query('SELECT * FROM accounts');
  console.log(voters);
  res.send({ status: 'success', voters: voters.rows });
});

router.post('/deletevoter', async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  await pool
    .query('DELETE FROM accounts WHERE email = $1', [email])
    .then(async () => {
      console.log('deleted');
      res.send({ status: 'success', message: 'Voter deleted successfully' });
    })
    .catch((err) => {
      res.send({ status: 'error', message: err.message });
    });
});

router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    age,
    aadhaar,
    fatherName,
    mobileNumber,
    address,
    gender,
  } = req.body;

  const emailAlreadyExists = await pool.query(
    'SELECT * FROM accounts WHERE email = $1',
    [email]
  );
  const aadharAlreadyExists = await pool.query(
    'SELECT * FROM accounts WHERE aadhaar = $1',
    [aadhaar]
  );
  if (
    emailAlreadyExists.rows.length !== 0 ||
    aadharAlreadyExists.rows.length !== 0
  ) {
    return res.send({
      status: 'error',
      msg: 'Email or aadhaar already exists',
    });
  }

  const hashedPassword = await argon2.hash(password);
  const lastVoterId = await pool.query(
    'SELECT voterid from accounts where id=(select max(id) from accounts)'
  );
  const voterid = lastVoterId.rows[0].voterid + 1;

  try {
    const newUser = await pool.query(
      'insert into accounts (name, email, password, age, aadhaar, fathername, mobilenumber, address, gender, voterid ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *',
      [
        username,
        email,
        hashedPassword,
        age,
        aadhaar,
        fatherName,
        mobileNumber,
        address,
        gender,
        voterid,
      ]
    );
    sendMail(email, voterid, aadhaar);
    res.send({
      status: 'success',
      user: {
        role: 'voter',
        username,
        email,
        voterid,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.send({
      status: 'error',
      msg: 'something went wrong',
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === 'admin' && password === 'admin') {
      return res.send({
        status: 'success',
        user: {
          role: 'admin',
          username: 'admin',
          voterid: 'admin',
          email: 'admin',
        },
      });
    }
    const user = await pool.query('SELECT * FROM accounts WHERE email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.send({
        status: 'error',
        msg: 'Invalid email or password',
      });
    }
    const validPassword = await argon2.verify(user.rows[0].password, password);
    if (!validPassword) {
      return res.send({
        status: 'error',
        msg: 'Invalid email or password',
      });
    }
    res.send({
      status: 'success',
      user: {
        role: 'voter',
        username: user.rows[0].name,
        voterid: user.rows[0].voterid,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/sendotp', async (req, res) => {
  const { email, voterId } = req.body;
  console.log(email, voterId);

  const otp = Math.floor(1000 + Math.random() * 9000);
  const user = await pool.query('SELECT * FROM accounts WHERE email = $1', [
    email,
  ]);

  console.log(user.rows[0].voterid, otp);

  if (user.rows.length === 0) {
    return res.send({
      status: 'error',
      msg: 'Invalid email',
    });
  }
  if (voterId == user.rows[0].voterid) {
    sendMailOTP(email, otp);
    return res.send({
      status: 'success',
      otp,
    });
  }
  res.send({
    status: 'error',
    msg: 'Invalid voter ID',
  });
});

module.exports = router;
