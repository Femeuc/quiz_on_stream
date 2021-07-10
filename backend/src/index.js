const express = require('express');
const app = express();
const cors = require('cors');

// cors config // origin: 'http://127.0.0.1:3000/'
app.use(cors({
  origin: '*'
}));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Routes
//app.use(require('./routes/index'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);