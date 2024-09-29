const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(err.code).json(err.message)
        res.json({ users: results })
    })
})

router.get('/:id(\\d+)', (req, res) => {
    const { id } = req.params
    
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(err.code).json(err.message)
        if (!result.length) return res.status(404).json('Resource not found.')
        res.status(200).json(result[0])
    })
})

module.exports = router
