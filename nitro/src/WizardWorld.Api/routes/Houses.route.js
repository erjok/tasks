const express = require('express');
const Houses = require('../services/Houses');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
    "query": req.query.query,
  };


  try {
    const result = await Houses.getHouses(options);
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
    const result = await Houses.getId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;