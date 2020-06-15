if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbURL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => console.log('Connected to database...'));
db.on('error', (error) => console.log(error));

app.use(express.json());

const jobsRoute = require('./routes/jobs');
app.use('/jobs', jobsRoute);

// app.get('/', (req, res) => {
//   res.send(`Hello from GET`);
// });

app.listen(port, () => console.log(`Server listening on port ${port}`));
