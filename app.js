const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt');
const saltRounds = 11;

//http://localhost:3000/
const port = 3000;

let db = new sqlite3.Database("active-citizen-web.db",  (err) => {
    if(err){
      console.log('Error Occured - ' + err.message)
    }
    else{
      console.log('Database connected')
    }
  });
  db.run('PRAGMA foreign_keys = ON;', (err) => {
    if(err){
      console.log(err)
    } else{
      console.log('Foreign keys enabled')
    }
  });
  
  app.use(express.json());
  app.use(express.static('public'));

  app.get('/api/test', (req, res) => {
    res.json({ message: 'Yes the API works' });
  });

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  
  process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        }
        console.log('Database closed');
        process.exit(0);
    });
  });