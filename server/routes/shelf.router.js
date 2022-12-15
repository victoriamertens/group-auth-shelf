const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

// Get all shelved items
router.get('/', (req, res) => {
  // get [{id: #, description: 'string', image_url: 'url', user_id: #}, {...}, {...}, ...]

  res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // receive object of {id: #, description: 'string', image_url: 'url', user_id: #}
    //authoriztion : choose your own adventure for limits/divides
    // if(req.user.access_level > 10)
    console.log('/shelf POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);`
    let queryValues = [req.body.description, req.body.image_url, req.user.id]
    pool.query(queryText, queryValues)
    .then(() => {
    console.log('working item post')
    res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500)
    })
});

  // endpoint functionality

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // Only an user with matching id to item can delete the item.
  // use req.user.id & req.param.id


  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
  // returns total number of items in shelf
  //Select * shelf and count(something);
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // select * shelved item where id = req.user.id

  // endpoint functionality
});

module.exports = router;
