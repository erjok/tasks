const express = require('express');
const Spells = require('../services/Spells');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
    "incantation": req.query.incantation,
    "name": req.query.name,
    "type": req.query.type,
  };


  try {
    const result = await Spells.getSpells(options);
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
    const result = await Spells.getId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;