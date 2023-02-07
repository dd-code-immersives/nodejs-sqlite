const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(quotes.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

router.get('/byauthor/:search', function(req, res, next){
  try {
    const search  = req.params.search;
    res.json(quotes.getMultiple(req.query.page, search));
  } catch (err) {
    
  }
})

/* POST quote */
router.post('/', function(req, res, next) {
  try {
    res.json(quotes.create(req.body));
  } catch(err) {
    console.error(`Error while adding quotes `, err.message);
    next(err);
  }
});

module.exports = router;
