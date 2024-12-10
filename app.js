const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


mongoose.connect(
  'mongodb+srv://seck:Babacar98@fisrtcluster.l2euc.mongodb.net/?retryWrites=true&w=majority&appName=FisrtCluster',
  {useNewUrlParser : true,
  useUnifiedTopology: true})
    .then(() => console.log('Connexion a Mongodb reussie'))
    .catch(() => console.log('Connexion a mongodb echoue'))

const app = express();
app.use(express.json());
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;