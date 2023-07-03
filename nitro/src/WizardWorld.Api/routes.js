module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/Elixirs', require('./routes/Elixirs.route'));
  app.use('/Feedback', require('./routes/Feedback.route'));
  app.use('/Houses', require('./routes/Houses.route'));
  app.use('/Ingredients', require('./routes/Ingredients.route'));
  app.use('/Spells', require('./routes/Spells.route'));
  app.use('/Wizards', require('./routes/Wizards.route'));

};
