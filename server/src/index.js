const express = require('express');
const cors = require('cors');
const User = require('./routes/User');
const News = require('./routes/News');

const app = express();
app.use(cors());
app.use(express.json());
app.use(User);
app.use(News);

app.get('/', (req, res) => {
  console.log('hello');
  res.send('hello world');
});

app.listen(4000, () => {
  console.log('server has started on port 4000');
});
