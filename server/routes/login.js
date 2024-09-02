const express = require('express')
const router = express.Router()
const db = require('../db') // データベース接続をインポート
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// ユーザーのログインを処理するエンドポイント
router.post('/', (req, res) => {
  const { email, password } = req.body

  // ユーザーを検索するクエリ
  const findUserQuery = 'SELECT * FROM users WHERE email = ?'
  db.query(findUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err)
      return res.status(500).json({ message: 'Server error' })
    }

    // ユーザーが存在しない場合
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = results[0]

    // パスワードの比較
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err)
        return res.status(500).json({ message: 'Server error' })
      }

      // パスワードが一致しない場合
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      // JWTトークンを発行
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' })

      res.json({ message: 'Login successful', token })
    })
  })
})

module.exports = router
