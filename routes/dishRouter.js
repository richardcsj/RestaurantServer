const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');


const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.get((req,res,next) => {
  Dishes.find({})
  .then((dishes) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(dishes);
  }, (e) => next(e))
  .catch((e) => next(e));
})
.post((req,res,next) => {
  Dishes.create(req.body)
  .then((dish) => {
    console.log('Dish created', dish);
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(dish);
  }, (e) => next(e))
  .catch((e) => next(e));
})
.put((req,res,next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


dishRouter.route('/:dishId')
.get((req,res,next) => {
  Dishes.findById(req.params.dishId)
  .then((dish) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(dish);
  }, (e) => next(e))
  .catch((e) => next(e));
})
.post((req,res,next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res,next) => {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  }, {new: true})
  .then((dish) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(dish);
  }, (e) => next(e))
  .catch((e) => next(e));
})
.delete((req,res,next) => {
  Dishes.findByIdAndRemove(req.params.dishId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = dishRouter;


// app.get('/dishes/:dishId', (req,res,next) => {
//   res.end('Will send detail of the dish: ' + req.params.dishId + ' to you');
// });
//
// app.post('/dishes/:dishId', (req,res,next) => {
//   res.statusCode = 403;
//   res.end('POST operation not supported on /dishes/'+ req.params.dishId);
// });
//
// app.put('/dishes/:dishId', (req,res,next) => {
//   res.write('Updating the dish: ' + req.params.dishId + '\n');
//   res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });
//
// app.delete('/dishes/:dishId', (req,res,next) => {
//   res.end('Deleting the dish: ' + req.params.dishId);
// });