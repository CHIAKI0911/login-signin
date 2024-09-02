const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../db') // データベース接続設定のインポート

// ミドルウェア: JWTトークンを検証する
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// プロフィール情報を取得するエンドポイント
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id

  // ユーザー情報を検索するクエリ
  const query = 'SELECT email, first_name, last_name FROM users WHERE id = ?'
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err)
      return res.status(500).json({ message: 'Database error' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    // 必要なデータを返す
    const user = results[0]
    res.json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    })
  })
})

module.exports = router
