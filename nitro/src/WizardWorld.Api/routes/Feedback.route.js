const express = require('express');
const Feedback = require('../services/Feedback');
const router = new express.Router();
 
router.post('/', async (req, res, next) => {
  let options = { 
  };

  options.sendFeedbackCommand = req.body;

  try {
    const result = await Feedback.postFeedback(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;