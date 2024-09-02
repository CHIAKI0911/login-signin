const express = require('express')
const router = express.Router()
const db = require('../db') // データベース接続をインポート
const bcrypt = require('bcrypt')

// サインアップエンドポイント
router.post('/signup', (req, res) => {
  const { first_name, last_name, email, password } = req.body

  // ユーザーが既に存在するか確認するクエリ
  const findUserQuery = 'SELECT * FROM users WHERE email = ?'
  db.query(findUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err)
      return res.status(500).json({ message: 'Server error' })
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // パスワードをハッシュ化する
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err)
        return res.status(500).json({ message: 'Server error' })
      }

      // 新しいユーザーを作成するクエリ
      const createUserQuery =
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)'
      db.query(createUserQuery, [first_name, last_name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error creating user:', err)
          return res.status(500).json({ message: 'Error creating user' })
        }
        res.status(201).json({ message: 'User created successfully' })
      })
    })
  })
})

module.exports = router
