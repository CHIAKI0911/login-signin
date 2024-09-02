const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// ルートモジュールのインポート
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const profileRoute = require('./routes/profile')
// const resetPasswordRoute = require('./routes/reset-password')

app.post('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/profile', profileRoute)
// app.use('/reset-password', resetPasswordRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
