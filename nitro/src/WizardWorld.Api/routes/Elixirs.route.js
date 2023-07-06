const express = require('express');
const Elixirs = require('../services/Elixirs');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
    "difficulty": req.query.difficulty,
    "ingredient": req.query.ingredient,
    "inventorFullName": req.query.inventorFullName,
    "manufacturer": req.query.manufacturer,
    "name": req.query.name,
  };


  try {
    const result = await Elixirs.getElixirs(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.get('/:id', async (req, res, next) => {
  let options = { 
    "id": req.params.id,
  };


  try {
    const result = await Elixirs.getId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;