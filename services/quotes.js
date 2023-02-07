const db = require('../services/db');
const config = require('../config');

/**
 * 
 * Utility Library / Helper Library
 * To build sql queries 
 */


//be able to modify this program to display authors
// by a given first letter 
// i.e. "B". 


//Select quotes LIMIT to what is set to display in config.js
function getMultiple(page = 1, query='') {
  const final_query = query + '%';
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote WHERE author LIKE ? LIMIT ?,?`, [final_query, offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}
// make sure the quote object in the post is valid 
function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  //make sure all the necessary fields exist
  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }
  
  if (messages.length) {
    //concats all messages into one string
    // and throws an error
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}
// create a new quote in the database 
// add a quote to the quotes database
// inserting a new entry into the quote table
function create(quoteObj) {
  validateCreate(quoteObj);
  const {quote, author} = quoteObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', {quote, author});
  
  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
