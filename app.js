const express = require('express');
const hbs = require('hbs');
const path = require('path');
const sql = require('./utils/sql');

const port = process.env.PORT || 5050;
const app = express();
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

app.get('/', (req, res) => {
  res.render('home', { homemessage: "hey there", bio: "some generic bio info"});
})

app.get('/users', (req, res) => {
  //get user data here

  //try a database connection
  // if a connection fails, error will be loged into a console
  sql.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    let query = "SELECT * FROM tbl_card";

    sql.query(query, (err, rows) => {
      connection.release();

      if (err) {
        return console.log(err.message);
      }

      console.log(rows);

      res.render('user',rows[0]);
    })
  })
})

app.listen(port,() => {
  console.log(`app is running on port ${port}`)
})