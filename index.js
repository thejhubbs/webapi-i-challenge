// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
  const newUser = req.body

  if(newUser.name && newUser.bio){
    db.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({error: "The user could not be created."})
    })
  } else {
      res.status(400).json({error: "Need name & bio."})
  }

})

server.get('/api/users', (req, res) => {
  db.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(500).json({error: "The users information could not be retrieved."})
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
  .then(user => {
    if(user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: "invalid id"
      })
    }
  })
  .catch(err => {
    res.status(500).json({error: "The users information could not be retrieved."})
  })
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.remove(id)
  .then(user => {
    if(user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: "invalid id"
      })
    }
  })
  .catch(err => {
    res.status(500).json({error: "The users information could not be retrieved."})
  })
})

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const newInfo = req.body


  if(newInfo.name && newInfo.bio){
    db.update(id, newInfo)
    .then(user => {
      if(user) {
        res.json(user)
      } else {
        res.status(404).json({
          message: "invalid id"
        })
      }
    })
    .catch(err => {
      res.status(500).json({error: "The users information could not be retrieved."})
    })


  } else {
    res.status(400).json({error: "Need name & bio."})
  }


})






server.listen(4000, () => {
  console.log("Server is now listening on port 4000...")
})
