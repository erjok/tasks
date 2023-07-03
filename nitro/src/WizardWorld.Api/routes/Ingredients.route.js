const express = require('express');
const Ingredients = require('../services/Ingredients');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
    "name": req.query.name,
  };


  try {
    const result = await Ingredients.getIngredients(options);
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
    const result = await Ingredients.getId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;