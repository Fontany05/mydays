const mongoose = require('mongoose');
const {mondodb} = require('./keys');

mongoose.connect(mondodb.URI)
  .then( () => console.log('database is connected!'))
  .catch(err => console.error(err));




