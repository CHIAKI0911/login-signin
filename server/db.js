const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'g021c1022',
  database: 'bravesoft課題'
})

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err)
    return
  }
  console.log('MySQL Connected')
})

module.exports = db
