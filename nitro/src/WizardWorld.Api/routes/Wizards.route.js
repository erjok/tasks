const express = require('express');
const Wizards = require('../services/Wizards');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
  };


  try {
    const result = await Wizards.getWizards(options);
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
    const result = await Wizards.getId(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;