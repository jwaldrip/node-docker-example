const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');

const cache = require('express-redis-cache')({ host: process.env.REDIS_HOST });

const app = express()
mongoose.connect(`mongodb://${process.env.MONGO_HOST}/test`);

const kittySchema = mongoose.Schema({
    name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);

app.use(morgan('tiny'))

app.get('/kittens', function (req, res) {
  cache.route(),
  Kitten.find({}, function(err, kittens) {
    res.send(kittens);
  });
})

app.get('/new_kitten', function (req, res) {
  new Kitten({ name: 'fluffy' }).save(() => res.sendStatus(201))
})

app.listen(process.env.PORT)
