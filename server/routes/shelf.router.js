const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Get all shelved items
router.get('/', rejectUnauthenticated, (req, res) => {
  // get [{id: #, description: 'string', image_url: 'url', user_id: #}, {...}, {...}, ...]
  console.log('/shelf GET route');
  // if(req.isAuthenticated()){
  let queryText = `SELECT * FROM "item";`;

  pool
    .query(queryText)
    .then((result) => {
      // send result.rows to requesting site
      console.log('results of /shelf Get Route', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  // } else {
  //   res.sendStatus(403);
  // }
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
    VALUES ($1, $2, $3);`;
  let queryValues = [req.body.description, req.body.image_url, req.user.id];
  pool
    .query(queryText, queryValues)
    .then(() => {
      console.log('working item post');
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// endpoint functionality

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // Only an user with matching id to item can delete the item.
  // use req.user.id & req.param.id
  console.log('router.delete(/:id,');
  console.log(req.params.id, req.user.id);
  // if(req.isAuthenticated()){
  let queryText = `DELETE FROM "item" Where user_id = $1 AND id = $2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      // send result.rows to requesting site
      console.log('results of /shelf Get Route', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  // } else {
  //   res.sendStatus(403);
  // }  // endpoint functionality
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in /api/shelf/:id update');

  // if(req.isAuthenticated()){

  let queryText = `UPDATE "item" 
                    SET description = $1, image_url = $2
                    Where id = $3 & user_id = $4;`;
  pool
    .query(queryText, [
      req.body.description,
      req.body.image_url,
      req.params.id,
      req.user.id,
    ])
    .then((result) => {
      // send result.rows to requesting site
      console.log('results of /shelf/count Route', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  // } else {
  //   res.sendStatus(403);
  // }  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  // returns total number of items in shelf
  //Select * shelf and count(something);
  console.log('in /api/shelf/count -> returns {count: #}');
  let queryText = `SELECT COUNT(id) FROM "item";`;

  pool
    .query(queryText)
    .then((result) => {
      // send result.rows to requesting site
      console.log('results of /shelf/count Route', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Return a specific item by id
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // select * shelved item where id = $1

  let queryText = `Select * FROM "item" WHERE id = $1`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      // send result.rows to requesting site
      console.log('results of /shelf Get Route', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get('/userId', rejectUnauthenticated, (req, res) => {
  // get user's personal shelf => [{id: #, description: 'string', image_url: 'url', user_id: #}, {...}, {...}, ...]
  console.log('/shelf GET route');
  // if(req.isAuthenticated()){
  let queryText = `SELECT * FROM "item" WHERE user_id = $1;`;

  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      // send result.rows to requesting site
      console.log('results of /shelf/userId Get Route', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  // } else {
  //   res.sendStatus(403);
  // }  // endpoint functionality
});

module.exports = router;
