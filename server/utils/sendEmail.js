const nodemailer = require('nodemailer')

// メール送信の設定
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // 環境変数で設定
    pass: process.env.GMAIL_PASS // 環境変数で設定
  }
})

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error // エラーが発生した場合にスロー
  }
}

module.exports = sendEmail
