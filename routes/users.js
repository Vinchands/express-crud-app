const express = require('express')
const db = require('../db')

const router = express.Router()

// * users/
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.render('users/index', { users: results })
    })
})

// * users/create
router.route('/create')

.get((req, res) => {
    res.status(200).render('users/form')
})

.post((req, res) => {
    const { name, email, job } = req.body
    
    db.query('INSERT INTO users(name, email, job) VALUES(?, ?, ?)', [name, email, job], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.status(201).redirect('/users')
    })
})

// * users/:id/edit
router.route('/:id/edit')

.get((req, res) => {
    const { id } = req.params
    
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.status(200).render('users/form', { user: result[0] })
    })
})

.put((req, res) => {
    const { id } = req.params
    const { name, email, job } = req.body
    
    db.query('UPDATE users SET name = ?, email = ?, job = ? WHERE id = ?', [name, email, job, id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.status(202).redirect('/users')
    })
})

// * users/:id/delete
router.delete('/:id/delete', (req, res) => {
    const { id } = req.params
    
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.status(200).redirect('/users')
    })
})

module.exports = router
