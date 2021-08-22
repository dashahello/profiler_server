const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const profilesRoute = require('./routes/profiles.js');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.static(process.env.STATIC_DIRECTORY));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/profiles', profilesRoute);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set('useFindAndModify', false);
