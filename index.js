let express = require('express')
let app = express()
let port = 3000

//let router = require('express').Router()

let store = []

let util = require('util');

app.get('/', (req, res) => {
    res.statusCode = 200
    res.sendFile('/welcome.html', { root: __dirname })
    //res.send('Welcome to Lau Wei Tang JS Backend Project. Here are some of the APIs')
});

app.get('/store', (req, res) => {
    res.json(store)
})

app.get('/store/:index', (req, res) => {
    res.json(store[req.params.index])
})

app.post('/store/:value', (req, res) => {
    let value = req.params.value
    store.push(value)
    res.send(util.format('Inserted content: index = %d, value = %s', store.length - 1, value))
})

app.post('/store/:index/:value', (req, res) => {
    let index = req.params.index
    let value = req.params.value
    if (index > store.length) {
        res.send(util.format('invalid index. index entered = %d, size of db = %d', index, store.length))
        return
    }
    store.splice(index, 0, value)
    res.send(util.format('Inserted content: index = %d, value = %s', index, value))
})

app.put('/store/:value', (req, res) => {
    if (store.length == 0) {
        res.send('The list is empty')
        return
    }
    let value = req.params.value
    store[store.length - 1] = value
    res.send(util.format('Replaced content: index = %d, value = %s', store.length - 1, value))
})

app.put('/store/:index/:value', (req, res) => {
    let index = req.params.index
    let value = req.params.value
    if (index > store.length) {
        res.send(util.format('invalid index. index entered = %d, size of db = %d', index, store.length))
        return
    }
    store[index] = value
    res.send(util.format('Replaced content: index = %d, value = %s', index, value))
})

app.delete('/store', (req, res) => {
    let value = store.pop()
    res.send(util.format('Deleted content: index = %d, value = %s', store.length, value))
})

app.delete('/store/all', (req, res) => {
    while (store.length) {
        store.pop();
    }
    res.send(util.format('Deleted all content'))
})

app.delete('/store/:index', (req, res) => {
    let index = req.params.index
    let valueToDelete = store[index]
    store.splice(index, 1)
    res.send(util.format('Deleted content: index = %d, value = %s', index, valueToDelete))
})

app.listen(port, () => {
    console.log("Running App on port " + port);
});

// Export our app for testing purposes
module.exports = app