const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post("/notes", (req, res) => {
  // Save a new note on request
  let note = fs.readFileSync('db/db.json');
  note = JSON.parse(note);
  res.json(note);

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  note.push(newNote);
  fs.writeFileSync('db/db.json', JSON.stringify(note));
  res.json(note);
})


module.exports = router;
