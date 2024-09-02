const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const db = require('../db')

// パスワードリセットリクエストの処理
router.post('/request', async (req, res) => {
  const { email } = req.body

  try {
    // ユーザーの存在確認とトークンの生成
    const user = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const token = crypto.randomBytes(20).toString('hex')

    // トークンの保存（例: DB への保存など）
    await db.query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?', [
      token,
      Date.now() + 3600000,
      email
    ])

    // メールの送信
    const resetLink = `http://localhost:5000/reset-password/reset/${token}`
    await sendEmail(
      email,
      'Password Reset Request',
      `Please reset your password by clicking the following link: ${resetLink}`
    )

    res.status(200).json({ message: 'Password reset link sent to your email.' })
  } catch (error) {
    console.error('Error handling password reset request:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
