const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db_config = require("./config/db.config");
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT =  5000;


app.use(cors());
app.use(express.json());


mongoose.connect(db_config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
