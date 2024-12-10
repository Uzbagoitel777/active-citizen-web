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

  app.post('/api/register', (req, res) => {
    const {username, login, password} = req.body;
    if (!username || !login || !password){
      return res.status(400).json({success: false, error: 'Missing required fields'});
    }
  
    const checkEmailQuery = "SELECT login FROM users WHERE login = ?";
    db.get(checkEmailQuery, [login], (err, row) =>{
      if (err) {
          console.log(err);
          return res.status(500).json({success: false,  error: 'Database error'});
      }
      if (row){
        return res.status(409).json({success: false, error: 'Email already exists'});
      }
  
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Password hashing failed' });
        }
  
        const insertQuery = `
            INSERT INTO users (name, login, password, type) 
            VALUES (?, ?, ?, 1)
        `;
        db.run(insertQuery, [username, login, hash], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: 'Database error' });
            }
            res.json({ success: true, message: 'Registration successful' });
        });
    });
    });
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