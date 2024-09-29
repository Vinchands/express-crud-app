const express = require('express')
const methodOverride = require('method-override')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

const userRouter = require('./routes/users')
const apiRouter = require('./routes/api')

app.use('/users', userRouter)
app.use('/api/users', apiRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
