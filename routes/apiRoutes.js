const router = require('express').Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

let notes = [];




router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    res.json(notes);
  });
});


router.post('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});

router.delete('/notes/:id', (req, res) => {

  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    const id = req.params.id;
    notes = notes.filter((note) => note.id !== id);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});

module.exports = router;